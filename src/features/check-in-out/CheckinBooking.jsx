import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import useBookingId from '../../hooks/useBookingId';
import Spinner from '../../ui/Spinner';
import { useEffect, useState } from 'react';
import Checkbox from '../../ui/Checkbox';
import { formatCurrency } from '../../utils/helpers';
import useCheckin from '../../hooks/useCheckin';
import useSettings from '../../hooks/useSettings';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isPending } = useBookingId();
  const moveBack = useMoveBack();
  const { settings, isPending: isLoadingSetting } = useSettings();
  const { checkin, isCheckingIn } = useCheckin();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking]);

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    numNights,
    hasBreakfast,
    isPaid,
  } = booking;

  const optionalBreakfastPrice =
    settings?.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      const breakfast = {
        hasBreakfast: true,
        extrasPrice: optionalBreakfastPrice,
        totalPrice: optionalBreakfastPrice + totalPrice,
      };

      checkin({ bookingId, breakfast });
    } else {
      checkin({ bookingId });
    }
  }

  if (isPending || isLoadingSetting) return <Spinner />;

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((state) => !state);
              setConfirmPaid(false);
            }}
            id={'breakfast'}
          >
            Tambahkan layanan breakfast sebesar{' '}
            {formatCurrency(optionalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((state) => !state)}
          disabled={confirmPaid || isCheckingIn}
          id={'confirm'}
        >
          Konfirmasi {guests.fullName} telah membayar biaya layanan sebesar{' '}
          {!addBreakfast ? (
            formatCurrency(totalPrice)
          ) : (
            <span>
              <strong>
                {formatCurrency(totalPrice + optionalBreakfastPrice)}{' '}
              </strong>

              <span>
                ({formatCurrency(totalPrice)} +{' '}
                {formatCurrency(optionalBreakfastPrice)})
              </span>
            </span>
          )}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmPaid || isPaid || isCheckingIn}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
