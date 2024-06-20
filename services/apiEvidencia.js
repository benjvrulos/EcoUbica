import supabase from "./supabase";

export async function getEvidenciasApi(userId) {
  const { data, error } = await supabase.from("evidencia").select("*").eq("userId", userId);
  if (error) {
    console.error(error);
    throw new Error("Evidencias could not be loaded");
  }

  return data;
}
export async function createEvidencia(formEvidencia) {
  const { data, error } = await supabase.from("evidencia").insert([formEvidencia]).select();

  return data[0];
}
