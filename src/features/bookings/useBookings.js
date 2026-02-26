import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/ApiBooking";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
          method: "eq",
        };
  const sortRaw = searchParams.get("sortby") || "startDate-asc";
  const [field, direction] = sortRaw.split("-");
  const sortBy = {
    field,
    direction,
  };
  const {
    isLoading,
    data: bookings = [],
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });
  return { isLoading, error, bookings };
}
