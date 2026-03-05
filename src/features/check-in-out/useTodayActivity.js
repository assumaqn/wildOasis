import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/ApiBooking";

export function useTodayActivity() {
  const { data: activities, isLoading } = useQuery({
    queryKey: ["Today-activity"],
    queryFn: getStaysTodayActivity,
  });

  return { activities, isLoading };
}
