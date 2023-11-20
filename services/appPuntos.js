import supabase from "./supabase";

export async function getPuntos() {
  const { data, error } = await supabase.from("puntos").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}
export async function deletePunto(id) {
  const { data, error } = await supabase.from("puntos").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
  return data;
}
