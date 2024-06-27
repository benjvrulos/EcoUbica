import supabase from "./supabase";

export async function getPuntos(comunaId) {
  const { data, error } = await supabase.from("puntos").select("*").eq("comunaId", comunaId);
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

export async function createPunto(punto, role) {
  let puntoCreated;
  switch (role) {
    case "admin":
      puntoCreated = { ...punto, aceptado: true };
      break;

    case "user":
      puntoCreated = punto;
      break;
    default:
      throw new Error("Unknown role");
  }

  const { data, error } = await supabase.from("puntos").insert([puntoCreated]).select();

  if (error) {
    console.log(error);
    throw new Error("There was an error creating the punto");
  }
  return data[0];
}
