import BookingRow from './BookingRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';
import useBookings from '../../hooks/useBooking';
import Spinner from '../../ui/Spinner';
import Pagination from '../../ui/Pagination';

function BookingTable() {
  const { isPending, bookings, count } = useBookings();

  if (isPending) return <Spinner />;

  if (!bookings.length) return <Empty resourceName={'Booking'} />;

  return (
    <Menus>
      <Table columns='0.6fr 2fr 2fr 1.3fr 1.3fr 1rem'>
        <Table.Header>
          <div>Fasilitas</div>
          <div>Tamu</div>
          <div>Tanggal</div>
          <div>Status</div>
          <div>Jumlah</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
