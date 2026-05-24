-- Add approval workflow columns to agents table
ALTER TABLE agents 
ADD COLUMN status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
ADD COLUMN approved_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN approved_by UUID REFERENCES agents(id);

-- Create index on status for faster queries
CREATE INDEX idx_agents_status ON agents(status);

-- Update RLS policies to only allow approved agents to access their data
CREATE POLICY "Agents can only view own data if approved" ON agents
  FOR SELECT USING (auth.uid() = id AND status = 'approved');

CREATE POLICY "Agents can only update own data if approved" ON agents
  FOR UPDATE USING (auth.uid() = id AND status = 'approved' AND NOT EXISTS (
    SELECT 1 FROM admins WHERE id = auth.uid()
  ));
