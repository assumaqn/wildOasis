import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isLoading: isLogin } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      navigate("/");
      console.log(user);
    },
    onError: () => {
      toast.error("Provided email or password are incorrect");
    },
  });
  return { login, isLogin };
}
