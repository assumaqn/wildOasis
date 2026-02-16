import supabase from "./Supabase";
export async function FetchSetting() {
  const { data: setting, error } = await supabase
    .from("setting")
    .select("*")
    .single();

  if (error) {
    throw new Error("Can't fetch Setting data");
  }
  return setting;
}

export async function updatingSetting(newSetting) {
  const { data, error } = await supabase
    .from("setting")
    .update(newSetting)
    .eq("some_column", "someValue")
    .select();

  if (error) {
    throw new Error("Can't fetch Setting data");
  }
  return data;
}
