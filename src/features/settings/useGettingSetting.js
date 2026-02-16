import { useQuery } from "@tanstack/react-query";
import { FetchSetting } from "../../services/SettingApi";

export function useGettingSetting() {
  const {
    isLoading,
    error,
    data: setting,
  } = useQuery({
    queryKey: ["setting"],
    queryFn: FetchSetting,
  });
  return { isLoading, error, setting };
}
