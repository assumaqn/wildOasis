import supabase from "./Supabase";

export async function getBookings({ filter, sortBy }) {
  console.log(filter);
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNight, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
    );
  // .eq("status", "unconfirmed");
  if (filter) query = query.eq(filter.field, filter.value);
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction == "asc",
    });
  const { data, error } = await query;
  if (error) throw new Error("Bookings can't be loaded!");

  return data;
}
