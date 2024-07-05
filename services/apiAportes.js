import supabase, { supabaseUrl } from "./supabase";

export async function getAllAportesApi() {
  const { data, error } = await supabase.from("contribution").select(`*,puntos(comunaId)`);

  if (error) {
    console.error(error);
    throw new Error("Evidencias could not be loaded");
  }

  return data;
}

export async function createAporte(newContribution) {
  const { image, ...others } = newContribution;
  const { data: dataContribution, error } = await supabase.from("contribution").insert([others]).select().single();

  const imageName = `contributionId-${dataContribution.contributionId}.jpg`;
  const imagePath = `${supabaseUrl}/storage/v1/object/public/contributionImage/${imageName}`;

  if (error) {
    console.log("Error al insertar contribution");
    return;
  }

  const { error: storageError } = await supabase.storage.from("contributionImage").upload(imageName, newContribution.image);
  if (storageError) {
    console.log(storageError);
    return;
  }

  const { data } = await supabase.from("contribution").update({ image: imagePath }).eq("contributionId", dataContribution.contributionId).select().single();

  return data;
}
