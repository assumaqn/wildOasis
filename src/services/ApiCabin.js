import supabase, { supabaseUrl } from "./Supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("cabins couldn't be loaded");
  }
  return data;
}
export async function createCabins(newCabin, id) {
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image?.name}`;
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/Cabin-images/${imageName}`;
  //0.edit/createCabin

  let query = supabase.from("cabins");

  //1. create the cabins
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]).select();
  //1.1 Editing the cabins
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  const { data, error } = await query.single();
  if (error) {
    console.error(error);
    throw new Error("cabins couldn't be created");
  }
  //2. upload the imge
  // if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("Cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin image could not be uploaded and The cabin was not created",
    );
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("cabins couldn't be deleted");
  }
  return data;
}
