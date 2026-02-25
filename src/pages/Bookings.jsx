// import { useEffect, useState } from "react";
// import { fetchBookings } from "../services/ApiBooking";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";

function Bookings() {
  // const [booking, setBookings] = useState(null);
  // useEffect(() => {
  //   async function getBookings() {
  //     const bookings = await fetchBookings();
  //     setBookings(bookings);
  //   }
  //   getBookings();
  // }, []);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <p>TEST</p>
      </Row>
      <BookingTable />
    </>
  );
}

export default Bookings;
