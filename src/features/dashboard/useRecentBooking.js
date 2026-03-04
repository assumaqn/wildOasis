import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/ApiBooking";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export function useRecentBooking() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();
  const { data: booking, isLoading } = useQuery({
    queryKey: ["bookings", `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });
  return { booking, isLoading };
}
