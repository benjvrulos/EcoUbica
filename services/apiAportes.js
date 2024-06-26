import supabase, { supabaseUrl } from "./supabase";

export async function getAllAportesApi(userId) {
  const { data, error } = await supabase.from("contribution").select("*").eq("userId", userId);
  if (error) {
    console.error(error);
    throw new Error("Evidencias could not be loaded");
  }

  return data;
}

export async function createAporte(newEvidencia) {
  console.log(newEvidencia);
  const imageName = `punto/${newEvidencia.idPunto}.jpg`;
  const imagePath = `${supabaseUrl}/storage/v1/object/public/evidenciaImages/${imageName}`;

  console.log(imageName);
  const { data, error } = await supabase.from("evidencia").insert([{ ...newEvidencia, image: imagePath }]);

  const { error: storageError } = await supabase.storage.from("evidenciaImages").upload(imageName, newEvidencia.image);

  return data;
}
