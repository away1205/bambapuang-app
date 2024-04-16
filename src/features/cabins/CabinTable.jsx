import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import useCabin from '../../hooks/useCabin';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';

function CabinTable() {
  const { isPending, cabins } = useCabin();
  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;

  // 1. Filter
  const filterValue = searchParams.get('discount') || 'all';

  let filteredCabins;
  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'no-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === 'with-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  //2. Sort
  const sortBy = searchParams.get('sortBy') || 'startDate-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 1.4fr 2fr 14rem 0.3fr'>
        <Table.Header>
          <div></div>
          <div>Fasilitas</div>
          <div>Kapasitas</div>
          <div>Harga</div>
          <div>Diskon</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
