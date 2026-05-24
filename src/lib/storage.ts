import { supabase } from './supabase'

// Upload a file to Supabase Storage
export async function uploadFile(file: File, agentId: string, propertyId?: string): Promise<string> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${propertyId || 'temp'}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
  const filePath = `${agentId}/${fileName}`

  console.log('Uploading file:', { fileName, filePath, fileSize: file.size, fileType: file.type })

  const { data, error } = await supabase.storage
    .from('property-media')
    .upload(filePath, file)

  console.log('Upload result:', { data, error })

  if (error) {
    console.error('Detailed upload error:', error)
    throw new Error(`Error uploading file: ${error.message}`)
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('property-media')
    .getPublicUrl(filePath)

  return publicUrl
}

// Delete a file from Supabase Storage
export async function deleteFile(filePath: string): Promise<void> {
  const { error } = await supabase.storage
    .from('property-media')
    .remove([filePath])

  if (error) {
    throw new Error(`Error deleting file: ${error.message}`)
  }
}

// Upload multiple files
export async function uploadFiles(files: File[], agentId: string, propertyId?: string): Promise<string[]> {
  const uploadPromises = files.map(file => uploadFile(file, agentId, propertyId))
  return Promise.all(uploadPromises)
}
