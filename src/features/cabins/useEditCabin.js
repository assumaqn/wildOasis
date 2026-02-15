import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabins } from "../../services/ApiCabin";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isEditingSeccion, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabin, id }) => createCabins(newCabin, id),

    onSuccess: () => {
      (toast.success("Cabin Edited successfully"),
        queryClient.invalidateQueries({
          queryKey: ["cabin"],
        }));
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditingSeccion, editCabin };
}
