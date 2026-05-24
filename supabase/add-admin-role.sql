-- Create separate admins table
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  full_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on admins table
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Drop index if exists before creating
DROP INDEX IF EXISTS idx_admins_email;

-- Create index on email for faster queries
CREATE INDEX idx_admins_email ON admins(email);

-- Drop existing admin policies if they exist
DROP POLICY IF EXISTS "Admins can view own data" ON admins;
DROP POLICY IF EXISTS "Admins can update own data" ON admins;
DROP POLICY IF EXISTS "Allow admin registration" ON admins;

-- RLS policies for admins table
CREATE POLICY "Admins can view own data" ON admins
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can update own data" ON admins
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Allow admin registration" ON admins
  FOR INSERT WITH CHECK (true);

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admins can view all agents" ON agents;
DROP POLICY IF EXISTS "Admins can update agents" ON agents;

-- Update RLS policies on agents table to allow admins to view all agents
CREATE POLICY "Admins can view all agents" ON agents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Admins can update agents" ON agents
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE id = auth.uid()
    )
  );
