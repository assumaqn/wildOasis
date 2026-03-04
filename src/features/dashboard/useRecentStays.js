import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/ApiBooking";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();
  const { data: stays, isLoading } = useQuery({
    queryKey: ["bookings", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });
  const confimStay = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-ou",
  );
  return { stays, isLoading, confimStay };
}
