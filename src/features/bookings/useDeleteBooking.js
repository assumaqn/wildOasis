import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/ApiBooking";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: DeleteBooking } = useMutation({
    mutationFn: deleteBooking,

    onSuccess: () => {
      toast.success(`Booking successfully Deleted`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("There was an error On Deleting booking");
    },
  });
  return { isDeleting, DeleteBooking };
}
