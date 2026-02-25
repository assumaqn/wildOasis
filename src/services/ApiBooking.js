import supabase from "./Supabase";

export async function getBookings() {
  const { data: bookings, error } = await supabase.from("bookings").select("*");
  if (error) throw new Error("Bookings can't be loaded!");

  return bookings;
}
