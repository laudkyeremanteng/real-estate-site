-- Create storage bucket for property media
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-media', 'property-media', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public Access Property Media" ON storage.objects;
DROP POLICY IF EXISTS "Agents Can Upload Property Media" ON storage.objects;
DROP POLICY IF EXISTS "Agents Can Delete Own Property Media" ON storage.objects;

-- Create policy for public access to property media
CREATE POLICY "Public Access Property Media"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'property-media');

-- Create policy for all authenticated users to upload property media
CREATE POLICY "Authenticated Users Can Upload Property Media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'property-media');

-- Create policy for all authenticated users to delete property media
CREATE POLICY "Authenticated Users Can Delete Property Media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'property-media');
