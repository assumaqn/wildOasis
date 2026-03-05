import styled from "styled-components";
import { useRecentBooking } from "./useRecentBooking";
import Spinner from "../../ui/Spinner";

import Stats from "./Stats";
import { useCabinApi } from "../cabins/useCabinApi";
import { useRecentStay } from "./useRecentStay";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  useRecentStay();
  const { booking, isLoading, numDays } = useRecentBooking();
  const { isLoading: isLoading2, confirmStays } = useRecentStay();
  const { cabins, isLoading: isLoading3 } = useCabinApi();
  // console.log(booking, "confrim:", stays);
  if (isLoading || isLoading3 || isLoading2) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        booking={booking}
        confirmStay={confirmStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />

      <div>Today activity</div>
      <DurationChart confirmStay={confirmStays} />
      <SalesChart bookings={booking} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
export default DashboardLayout;
