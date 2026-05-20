-- Add media_urls column to properties table to store multiple media URLs
ALTER TABLE properties ADD COLUMN IF NOT EXISTS media_urls TEXT[];

-- Update the image_url column to be nullable (we'll use media_urls going forward)
ALTER TABLE properties ALTER COLUMN image_url DROP NOT NULL;

-- Add currency column to properties table
ALTER TABLE properties ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'GHS';

-- Add WhatsApp and phone columns for agent contact
ALTER TABLE properties ADD COLUMN IF NOT EXISTS whatsapp TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS phone TEXT;

-- Remove bedrooms and bathrooms columns (optional - if you want to keep them for backward compatibility, comment this out)
ALTER TABLE properties DROP COLUMN IF EXISTS bedrooms;
ALTER TABLE properties DROP COLUMN IF EXISTS bathrooms;
