import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import PropTypes from "prop-types";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ booking, confirmStay, numDays, cabinCount }) {
  const numBookings = booking.length;
  const sales = booking.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkIns = confirmStay.length;

  const occupation =
    confirmStay.reduce((acc, cur) => acc + cur.numNight, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        value={numBookings}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Sales"
        value={formatCurrency(sales)}
        color="green"
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Check ins"
        value={checkIns}
        color="indigo"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="Cccupay rate"
        value={Math.round(occupation * 100) + "%"}
        color="yellow"
      />
    </>
  );
}

Stats.propTypes = {
  booking: PropTypes.array,
  confirmStay: PropTypes.array,
  numDays: PropTypes.number,

  cabinCount: PropTypes.number,
};
export default Stats;
