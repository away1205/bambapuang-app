import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
import TableOperations from '../../ui/TableOperations';

function CabinTableOperation() {
  return (
    <TableOperations>
      <Filter
        filterField='discount'
        options={[
          { label: 'All', value: 'all' },
          { label: 'No Discount', value: 'no-discount' },
          { label: 'With Discount', value: 'with-discount' },
        ]}
      />

      <SortBy
        options={[
          { label: 'Urut dari A-Z', value: 'name-asc' },
          { label: 'Urut dari Z-A', value: 'name-desc' },
          { label: 'Harga Termurah', value: 'regularPrice-asc' },
          { label: 'Harga Termahal', value: 'regularPrice-desc' },
          { label: 'Kapasitas Terbesar', value: 'maxCapacity-desc' },
          { label: 'Kapasitas Terkecil', value: 'maxCapacity-asc' },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperation;
