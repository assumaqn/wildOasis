import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabins } from "../../services/ApiCabin";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createCabins,
    onSuccess: () => {
      (toast.success("Cabin Created successfully"),
        queryClient.invalidateQueries({
          queryKey: ["cabin"],
        }));
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createCabin };
}
