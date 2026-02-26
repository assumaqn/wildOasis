import { PAGE_SIZE } from "../utils/constant";
import supabase from "./Supabase";

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNight, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
      { count: "exact" },
    );
  // .eq("status", "unconfirmed");
  if (filter) query = query.eq(filter.field, filter.value);
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction == "asc",
    });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }
  const { data, error, count } = await query;
  if (error) throw new Error("Bookings can't be loaded!");

  return { data, count };
}
