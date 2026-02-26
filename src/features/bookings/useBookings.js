import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/ApiBooking";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();
  ///fillter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
          method: "eq",
        };
  ///Sort
  const sortRaw = searchParams.get("sortby") || "startDate-asc";
  const [field, direction] = sortRaw.split("-");
  const sortBy = {
    field,
    direction,
  };
  ///Pagination
  const page = !searchParams.get("pages")
    ? 1
    : Number(searchParams.get("pages"));
  const {
    isLoading,
    data: { data: bookings = [], count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });
  return { isLoading, error, bookings, count, page };
}
