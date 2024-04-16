import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import useBookingId from '../../hooks/useBookingId';
import Spinner from '../../ui/Spinner';
import { HiArrowUpOnSquare, HiTrash } from 'react-icons/hi2';
import useCheckOut from '../../hooks/useCheckout';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import useDeleteBooking from '../../hooks/useDeleteBooking';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking = {}, isPending } = useBookingId();
  const { checkout, isCheckingOut } = useCheckOut();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const navigate = useNavigate();

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  const { status, id: bookingId } = booking;

  if (isPending) return <Spinner />;

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Kembali</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal>
          <Modal.Open opens={'delete'}>
            <Button
              variation={'danger'}
              icon={<HiTrash />}
              disabled={isDeleting}
            >
              Hapus
            </Button>
          </Modal.Open>

          <Modal.Window name={'delete'}>
            <ConfirmDelete
              disabled={isDeleting}
              resourceName={'Booking'}
              onConfirm={() => {
                deleteBooking(bookingId, { onSettled: () => navigate(-1) });
              }}
            />
          </Modal.Window>
        </Modal>

        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === 'checked-in' && (
          <Button
            disabled={isCheckingOut}
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkout(bookingId)}
          >
            Check out
          </Button>
        )}

        <Button variation='secondary' onClick={moveBack}>
          Kembali
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
