import supabase from "./Supabase";

export async function getBookings() {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNight, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
    );
  if (error) throw new Error("Bookings can't be loaded!");

  return data;
}
