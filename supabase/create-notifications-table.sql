-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('approval', 'rejection', 'property_approved', 'property_rejected')),
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on agent_id for faster queries
CREATE INDEX IF NOT EXISTS idx_notifications_agent_id ON notifications(agent_id);

-- Create index on read status for faster queries
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);

-- Enable RLS on notifications table
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- RLS policies for notifications table
CREATE POLICY "Agents can view own notifications" ON notifications
  FOR SELECT USING (auth.uid() = agent_id);

CREATE POLICY "Agents can mark own notifications as read" ON notifications
  FOR UPDATE USING (auth.uid() = agent_id);

CREATE POLICY "Admins can create notifications" ON notifications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can update notifications" ON notifications
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE id = auth.uid()
    )
  );
