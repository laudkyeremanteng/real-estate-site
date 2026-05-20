-- Create storage bucket for property media
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-media', 'property-media', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy for public access to property media
CREATE POLICY "Public Access Property Media"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'property-media');

-- Create policy for agents to upload property media
CREATE POLICY "Agents Can Upload Property Media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'property-media' AND auth.role() = 'authenticated');

-- Create policy for agents to delete their own property media
CREATE POLICY "Agents Can Delete Own Property Media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'property-media' AND auth.uid()::text = (storage.foldername(name))[1]);
