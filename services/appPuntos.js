import supabase from "./supabase";

export async function getPuntos() {
  const { data, error } = await supabase.from("puntos").select("*");
  if (error) {
    console.error(error);
    throw new Error("Puntos could not be loaded");
  }

  return data;
}
export async function getPunto(id) {
  const { data, error } = await supabase.from("puntos").select().eq("id", id); // Correct

  if (error) {
    console.error(error);
    throw new Error("Punto could not be loaded");
  }
  return data[0];
}

export async function deletePunto(id) {
  const { error } = await supabase.from("puntos").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Punto could not be deleted");
  }
  return id;
}

export async function createPunto(punto) {
  const { data, error } = await supabase
    .from("puntos")
    .insert([{ ...punto }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Punto could not be created");
  }
  return data;
}
