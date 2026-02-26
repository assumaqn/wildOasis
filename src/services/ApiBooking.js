import supabase from "./Supabase";

export async function getBookings({ filter }) {
  console.log(filter);
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNight, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
    );
  // .eq("status", "unconfirmed");
  if (filter !== null) query = query.eq(filter.field, filter.value);
  const { data, error } = await query;
  if (error) throw new Error("Bookings can't be loaded!");

  return data;
}
