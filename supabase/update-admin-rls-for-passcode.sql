-- Drop all existing policies on agents table
DROP POLICY IF EXISTS "Admins can view all agents" ON agents;
DROP POLICY IF EXISTS "Admins can update agents" ON agents;
DROP POLICY IF EXISTS "All users can view agents" ON agents;
DROP POLICY IF EXISTS "All users can update agents" ON agents;
DROP POLICY IF EXISTS "All users can delete agents" ON agents;

-- Create new policy that allows all users to view agents
-- (Admin dashboard is protected by passcode, so this is safe)
CREATE POLICY "All users can view agents" ON agents
  FOR SELECT USING (true);

-- Create new policy that allows all users to update agents
-- (Admin dashboard is protected by passcode, so this is safe)
CREATE POLICY "All users can update agents" ON agents
  FOR UPDATE USING (true);

-- Create new policy that allows all users to delete agents
-- (Admin dashboard is protected by passcode, so this is safe)
CREATE POLICY "All users can delete agents" ON agents
  FOR DELETE USING (true);

-- Drop existing notification policies
DROP POLICY IF EXISTS "All users can insert notifications" ON notifications;

-- Create new policy that allows all users to insert notifications
CREATE POLICY "All users can insert notifications" ON notifications
  FOR INSERT WITH CHECK (true);
