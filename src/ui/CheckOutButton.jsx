import { useCheckout } from "../features/check-in-out/useCheckout";
import Button from "./Button";
import PropTypes from "prop-types";

function CheckOutButton({ bookingId }) {
  const { Updatecheckout } = useCheckout();
  const handleCheckout = () => {
    Updatecheckout(bookingId);
  };
  return (
    <Button size="small" variation="primary" onClick={handleCheckout}>
      Check out
    </Button>
  );
}

CheckOutButton.propTypes = {
  bookingId: PropTypes.number,
};

export default CheckOutButton;
