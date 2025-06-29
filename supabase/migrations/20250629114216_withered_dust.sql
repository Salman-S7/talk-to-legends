/*
  # Legend Request System

  1. New Tables
    - `legend_requests`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `legend_name` (text, required)
      - `time_era` (text, optional)
      - `profession` (text, optional)
      - `nationality` (text, optional)
      - `why_important` (text, required)
      - `specific_questions` (text, optional)
      - `additional_info` (text, optional)
      - `status` (enum: PENDING, APPROVED, REJECTED, COMPLETED)
      - `votes` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `legend_request_votes`
      - `id` (uuid, primary key)
      - `legend_request_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Users can create and view their own requests
    - Users can view all pending requests for voting
    - Users can vote once per request
*/

-- Create enum for legend request status
CREATE TYPE legend_request_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED');

-- Create legend_requests table
CREATE TABLE IF NOT EXISTS legend_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  legend_name text NOT NULL,
  time_era text,
  profession text,
  nationality text,
  why_important text NOT NULL,
  specific_questions text,
  additional_info text,
  status legend_request_status DEFAULT 'PENDING',
  votes integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create legend_request_votes table
CREATE TABLE IF NOT EXISTS legend_request_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legend_request_id uuid NOT NULL REFERENCES legend_requests(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  
  -- Ensure one vote per user per request
  UNIQUE(legend_request_id, user_id)
);

-- Enable RLS
ALTER TABLE legend_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE legend_request_votes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for legend_requests
CREATE POLICY "Users can create their own legend requests"
  ON legend_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own legend requests"
  ON legend_requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view all pending legend requests"
  ON legend_requests
  FOR SELECT
  TO authenticated
  USING (status = 'PENDING');

CREATE POLICY "Users can update their own legend requests"
  ON legend_requests
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for legend_request_votes
CREATE POLICY "Users can create votes"
  ON legend_request_votes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view all votes"
  ON legend_request_votes
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS legend_requests_user_id_idx ON legend_requests(user_id);
CREATE INDEX IF NOT EXISTS legend_requests_status_idx ON legend_requests(status);
CREATE INDEX IF NOT EXISTS legend_requests_votes_idx ON legend_requests(votes DESC);
CREATE INDEX IF NOT EXISTS legend_request_votes_request_id_idx ON legend_request_votes(legend_request_id);
CREATE INDEX IF NOT EXISTS legend_request_votes_user_id_idx ON legend_request_votes(user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_legend_requests_updated_at
    BEFORE UPDATE ON legend_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();