import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success(
        "The acoount has been created successfully please verfy you email",
      );
    },
    onError: () => {
      toast.error("There has been an error in creating the account");
    },
  });
  return { signUp, isLoading };
}
