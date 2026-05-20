-- Add media_urls column to properties table to store multiple media URLs
ALTER TABLE properties ADD COLUMN IF NOT EXISTS media_urls TEXT[];

-- Update the image_url column to be nullable (we'll use media_urls going forward)
ALTER TABLE properties ALTER COLUMN image_url DROP NOT NULL;
