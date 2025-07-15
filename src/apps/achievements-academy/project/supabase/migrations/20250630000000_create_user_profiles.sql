

-- Note: user_roles table and user_role_type enum already exist from previous migration

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  first_name text,
  last_name text,
  email uuid NOT NULL,
  avatar_url text,
  role user_role_type NOT NULL DEFAULT 'student',
  year_level integer,
  school text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT user_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
  CONSTRAINT user_profiles_email_fkey FOREIGN KEY (email) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create indexes for user_profiles
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_profiles

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own profile
CREATE POLICY "Users can delete own profile"
  ON user_profiles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Teachers can view student profiles they're connected to
CREATE POLICY "Teachers can view connected student profiles"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM student_connections sc
      WHERE sc.teacher_id = auth.uid()
      AND sc.student_id = user_profiles.user_id
      AND sc.status = 'accepted'
    )
    OR auth.uid() = user_id
  );

-- Create trigger for user_profiles updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE POLICY "Allow teachers to view progress of connected students"
ON public.user_progress
FOR SELECT
TO authenticated
USING ((user_id IN (
    SELECT student_id 
    FROM student_connections
    WHERE (teacher_id = (select auth.uid()) AND status = 'accepted')
  ))
);

CREATE POLICY "Allow teachers to view exam scores of connected students"
ON public.exam_scores
FOR SELECT
TO authenticated
USING ((user_id IN (
    SELECT student_id 
    FROM student_connections
    WHERE (teacher_id = (select auth.uid()) AND status = 'accepted')
  ))
);