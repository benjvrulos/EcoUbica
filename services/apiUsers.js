import supabase from "./supabase";

export async function loginApi(email, password) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error("Contraseña o email incorrecto");
  }

  return data;
}

export async function fetchUserInfo(idUser) {
  let { data: userInfo, error } = await supabase
    .from("usersInfo")
    .select()
    .eq("idUser", idUser);
  if (error) {
    console.error(error);
    throw new Error("Unknown");
  }
  return userInfo;
}
