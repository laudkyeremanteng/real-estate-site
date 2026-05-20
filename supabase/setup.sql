-- =================================================================
-- DELTA HOMES GH DATABASE SCHEMA
-- =================================================================

-- Create agents table
CREATE TABLE IF NOT EXISTS agents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  price NUMERIC NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  description TEXT,
  image_url TEXT,
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'rented', 'sold')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on properties agent_id for faster queries
CREATE INDEX IF NOT EXISTS idx_properties_agent_id ON properties(agent_id);

-- Create index on properties status for filtering
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);

-- Enable Row Level Security (RLS)
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- RLS policies for agents table
-- Agents can only see their own data
CREATE POLICY "Agents can view own data" ON agents
  FOR SELECT USING (auth.uid() = id);

-- Agents can insert their own data
CREATE POLICY "Agents can insert own data" ON agents
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Agents can update their own data
CREATE POLICY "Agents can update own data" ON agents
  FOR UPDATE USING (auth.uid() = id);

-- RLS policies for properties table
-- Everyone can view properties
CREATE POLICY "Everyone can view properties" ON properties
  FOR SELECT USING (true);

-- Agents can insert their own properties
CREATE POLICY "Agents can insert own properties" ON properties
  FOR INSERT WITH CHECK (auth.uid() = agent_id);

-- Agents can update their own properties
CREATE POLICY "Agents can update own properties" ON properties
  FOR UPDATE USING (auth.uid() = agent_id);

-- Agents can delete their own properties
CREATE POLICY "Agents can delete own properties" ON properties
  FOR DELETE USING (auth.uid() = agent_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
