import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import CheckBox from "../../ui/Checkbox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useEffect, useState } from "react";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useGettingSetting } from "../settings/useGettingSetting";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakFast, setAddbreakFast] = useState(false);
  const moveBack = useMoveBack();
  const { booking = {}, isLoading } = useBooking();
  const { isUpdating, Updatecheckin } = useCheckin();
  const { isLoading: isLoadSetting, setting } = useGettingSetting();

  const {
    id: bookingId,
    totalPrice,

    numGuests,
    hasBreakfast,
    numNight,
    guests,
  } = booking;

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking, bookingId]);
  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakFast) {
      Updatecheckin({
        bookingId,
        breakFast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      Updatecheckin({ bookingId, breakFast: {} });
    }
  }

  const optionalBreakfastPrice = setting?.breakFastPrice * numNight * numGuests;

  if (isLoading || isUpdating || isLoadSetting) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <CheckBox
            checked={addBreakFast}
            onChange={() => {
              setAddbreakFast((cur) => !cur);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
          </CheckBox>
        </Box>
      )}
      <Box>
        <CheckBox
          checked={confirmPaid}
          disabled={confirmPaid}
          onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
          id="confirm"
        >
          I confirm that ${guests.fullName} has paid amount{" "}
          {!addBreakFast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)}+${formatCurrency(optionalBreakfastPrice)})}
          `}
        </CheckBox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isUpdating}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
