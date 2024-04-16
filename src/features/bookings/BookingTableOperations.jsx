import SortBy from '../../ui/SortBy';
import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField='status'
        options={[
          { value: 'all', label: 'All' },
          { value: 'checked-out', label: 'Checked out' },
          { value: 'checked-in', label: 'Checked in' },
          { value: 'unconfirmed', label: 'Unconfirmed' },
        ]}
      />

      <SortBy
        options={[
          { value: 'startDate-desc', label: 'Urut Tanggal (Terbaru)' },
          { value: 'startDate-asc', label: 'Urut Tanggal (Terlama)' },
          {
            value: 'totalPrice-desc',
            label: 'Urut Jumlah (Terbanyak)',
          },
          { value: 'totalPrice-asc', label: 'Urut Jumlah (Terkecil)' },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
