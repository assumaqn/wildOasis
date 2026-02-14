import supabase, { supabaseUrl } from "./Supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("cabins couldn't be loaded");
  }
  return data;
}
export async function createCabins(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`;
  const imagePath = `${supabaseUrl}/storage/v1/object/public/Cabin-images/${imageName}`;
  //1. create the cabins

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();
  if (error) {
    console.error(error);
    throw new Error("cabins couldn't be created");
  }
  //2. upload the imge

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
