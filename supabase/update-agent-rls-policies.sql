-- Drop existing RLS policies on agents table
DROP POLICY IF EXISTS "Agents can only view own data if approved" ON agents;
DROP POLICY IF EXISTS "Agents can only update own data if approved" ON agents;

-- Recreate RLS policies to allow admins to view and update agents
CREATE POLICY "Agents can only view own data if approved" ON agents
  FOR SELECT USING (auth.uid() = id AND status = 'approved' AND NOT EXISTS (
    SELECT 1 FROM admins WHERE id = auth.uid()
  ));

CREATE POLICY "Agents can only update own data if approved" ON agents
  FOR UPDATE USING (auth.uid() = id AND status = 'approved' AND NOT EXISTS (
    SELECT 1 FROM admins WHERE id = auth.uid()
  ));
