import { supabase } from '../lib/supabase';

export const storageService = {
  async uploadFile(file: File) {
    const fileExt = file.name.split('.').pop();
    const uniqueFileName = `${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('seltronik-assets')
      .upload(`public/${uniqueFileName}`, file);

    if (error) {
      throw error;
    }

    const { data: publicUrlData } = supabase.storage
      .from('seltronik-assets')
      .getPublicUrl(data.path);

    return publicUrlData.publicUrl;
  },

  async deleteFile(fileUrl: string) {
    try {
      const url = new URL(fileUrl);
      const filePath = url.pathname.split('/seltronik-assets/')[1];
      
      if (!filePath) {
        console.warn('Could not determine file path from URL:', fileUrl);
        return;
      }

      const { error } = await supabase.storage
        .from('seltronik-assets')
        .remove([filePath]);

      if (error) {
        // It's okay if the file doesn't exist, so we can ignore 'Not Found' errors
        if (error.message !== 'Not Found') {
          throw error;
        }
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      // We don't re-throw here to avoid stopping the entire update process
      // if a file deletion fails for some reason (e.g., permissions, already deleted).
    }
  }
};