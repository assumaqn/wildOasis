import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/ApiBooking";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constant";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
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

  //pre-Fetching
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  return { isLoading, error, bookings, count, page };
}
