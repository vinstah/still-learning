/*
  # Create user progress and exam scores tables

  1. New Tables
    - `user_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `subject_id` (text)
      - `year_level` (integer)
      - `lesson_id` (text)
      - `completed` (boolean, default false)
      - `completed_at` (timestamptz, nullable)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())
    
    - `exam_scores`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `subject_id` (text)
      - `year_level` (integer)
      - `score` (integer)
      - `total_marks` (integer)
      - `percentage` (integer)
      - `completed_at` (timestamptz, default now())
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data

  3. Indexes
    - Add indexes for efficient querying by user_id, subject_id, and year_level
    - Add unique constraint on user_progress for user_id + lesson_id combination
*/

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  subject_id text NOT NULL,
  year_level integer NOT NULL,
  lesson_id text NOT NULL,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT user_progress_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
  CONSTRAINT user_progress_user_lesson_unique UNIQUE (user_id, lesson_id)
);

-- Create exam_scores table
CREATE TABLE IF NOT EXISTS exam_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  subject_id text NOT NULL,
  year_level integer NOT NULL,
  score integer NOT NULL,
  total_marks integer NOT NULL,
  percentage integer NOT NULL,
  completed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  CONSTRAINT exam_scores_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create indexes for user_progress
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_subject_year ON user_progress(subject_id, year_level);
CREATE INDEX IF NOT EXISTS idx_user_progress_completed ON user_progress(completed);

-- Create indexes for exam_scores
CREATE INDEX IF NOT EXISTS idx_exam_scores_user_id ON exam_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_scores_subject_year ON exam_scores(subject_id, year_level);
CREATE INDEX IF NOT EXISTS idx_exam_scores_completed_at ON exam_scores(completed_at);

-- Enable RLS
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_scores ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_progress
CREATE POLICY "Users can view own progress"
  ON user_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own progress"
  ON user_progress
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create RLS policies for exam_scores
CREATE POLICY "Users can view own exam scores"
  ON exam_scores
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exam scores"
  ON exam_scores
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own exam scores"
  ON exam_scores
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own exam scores"
  ON exam_scores
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create trigger function for updating updated_at column if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for user_progress updated_at
CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();