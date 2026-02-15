import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/ApiCabin";

export function useCabinApi() {
  const { data: cabins, isLoading } = useQuery({
    queryKey: ["cabin"],
    queryFn: getCabins,
  });
  return { cabins, isLoading };
}
