import supabase from "./supabase";

export async function loginApi(email, password) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error("Contraseña o email incorrecto");
  }

  return data;
}

export async function logoutApi() {
  let { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
    throw new Error("There was an error loging out");
  }
}

export async function signUpApi(email, password) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  return data;
}

export async function createUserInfo(fullName, idUser) {
  const resp = await supabase.from("usersInfo").insert({ idUser, fullName, role: "user", experiencia: 0, nivel: "principiante" });
  return resp;
}

export async function fetchUserInfo(idUser) {
  let { data: userInfo, error } = await supabase.from("usersInfo").select().eq("idUser", idUser);
  if (error) {
    throw new Error("Unknown");
  }
  return userInfo;
}
