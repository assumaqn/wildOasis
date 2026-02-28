import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/ApiBooking";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: Updatecheckout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully Check-out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("There was an error On check out");
    },
  });
  return { isUpdating, Updatecheckout };
}
