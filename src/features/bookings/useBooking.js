import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/ApiBooking";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBooking(Number(bookingId)),
  });

  console.log(booking, bookingId);
  return { isLoading, error, booking };
}
