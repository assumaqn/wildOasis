import supabase, { supabaseUrl } from "./Supabase";
export async function signUp({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error);
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data?.user;
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  let updateData;
  if (password)
    updateData = {
      password,
    };
  if (fullName) updateData = { data: { fullName } };
  const { data, error: updateError } =
    await supabase.auth.updateUser(updateData);

  if (updateError) throw new Error(updateError.message);
  if (!avatar) return data;
  ///if there is an avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: StorageError } = await supabase.storage
    .from("Avatares")
    .upload(fileName, avatar);
  if (StorageError) throw new Error(StorageError.message);

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avater: `${supabaseUrl}/storage/v1/object/public/Avatares/${fileName}`,
    },
  });

  if (error2) throw new Error(error2);
  return updatedUser;
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
