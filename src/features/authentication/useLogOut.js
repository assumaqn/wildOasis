import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut as logOutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logOut, isLoading } = useMutation({
    mutationFn: logOutApi,
    onSuccess: () => {
      navigate("/login", { replace: true });
      queryClient.removeQueries();
    },
  });
  return { logOut, isLoading };
}
