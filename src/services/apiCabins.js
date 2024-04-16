import supabase, { supabaseUrl } from './supabase';

async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Fasilitas tidak dapat dimuat');
  }

  return data;
}

export default getCabins;

export async function deleteCabin(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Fasilitas tidak dapat dihapus');
  }
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // Required to store the img link in the db
  const imageName = `${Math.random()}-${newCabin.image?.name?.replaceAll(
    '/',
    ''
  )}`;
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-imaages/${imageName}`;

  // Create/edit cabin
  let query = supabase.from('cabins');

  // A - Create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B - Edit cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Fasilitas tidak dapat ditambah');
  }

  // Upload image
  if (hasImagePath) return data;
  const { error: bucketError } = await supabase.storage
    .from('cabin-imaages')
    .upload(imageName, newCabin.image);

  // Delete cabin if there was an error uploading the image
  if (bucketError) {
    const { error } = await supabase.from('cabins').delete().eq('id', data.id);
    console.error(error);
    throw new Error(
      'Gambar tidak dapat diupload dan fasilitas tidak dapat dibuat'
    );
  }
}
