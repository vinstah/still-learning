/*
  # User Roles and Permissions System

  1. New Tables
    - `user_roles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `role` (enum: student, teacher, parent, tutor)
      - `permissions` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `student_connections`
      - `id` (uuid, primary key)
      - `teacher_id` (uuid, foreign key to auth.users)
      - `student_id` (uuid, foreign key to auth.users)
      - `relationship` (enum: teacher, parent, tutor, guardian)
      - `status` (enum: pending, accepted, declined)
      - `created_at` (timestamp)
      - `accepted_at` (timestamp, nullable)

  2. Security
    - Enable RLS on both tables
    - Add policies for users to manage their own roles
    - Add policies for teachers/parents to view connected students
*/

-- Create enum types
CREATE TYPE user_role_type AS ENUM ('student', 'teacher', 'parent', 'tutor');
CREATE TYPE connection_relationship AS ENUM ('teacher', 'parent', 'tutor', 'guardian');
CREATE TYPE connection_status AS ENUM ('pending', 'accepted', 'declined');

-- Create user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  role user_role_type NOT NULL DEFAULT 'student',
  permissions text[] DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create student_connections table
CREATE TABLE IF NOT EXISTS student_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  student_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  relationship connection_relationship NOT NULL,
  status connection_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  accepted_at timestamptz,
  UNIQUE(teacher_id, student_id, relationship)
);

-- Enable RLS
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_connections ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_roles
CREATE POLICY "Users can view own role"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own role"
  ON user_roles
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for student_connections
CREATE POLICY "Teachers can view their connections"
  ON student_connections
  FOR SELECT
  TO authenticated
  USING (auth.uid() = teacher_id);

CREATE POLICY "Students can view connections to them"
  ON student_connections
  FOR SELECT
  TO authenticated
  USING (auth.uid() = student_id);

CREATE POLICY "Teachers can create connections"
  ON student_connections
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = teacher_id);

CREATE POLICY "Teachers can update their connections"
  ON student_connections
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = teacher_id);

CREATE POLICY "Students can update connection status"
  ON student_connections
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = student_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON user_roles(role);
CREATE INDEX IF NOT EXISTS idx_student_connections_teacher_id ON student_connections(teacher_id);
CREATE INDEX IF NOT EXISTS idx_student_connections_student_id ON student_connections(student_id);
CREATE INDEX IF NOT EXISTS idx_student_connections_status ON student_connections(status);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for user_roles
CREATE TRIGGER update_user_roles_updated_at
  BEFORE UPDATE ON user_roles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();