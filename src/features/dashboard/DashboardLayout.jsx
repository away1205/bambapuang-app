import styled from 'styled-components';
import useRecentBookings from '../../hooks/useRecentBookings';
import Spinner from '../../ui/Spinner';
import useRecentStays from '../../hooks/useRecentStays';
import Stats from './Stats';
import useCabin from '../../hooks/useCabin';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import TodayActivity from '../check-in-out/TodayActivity';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isPending } = useRecentBookings();
  const {
    stays,
    confirmedStays,
    isPending: isPending2,
    numDays,
  } = useRecentStays();
  const { cabins, isPending3 } = useCabin();

  if (isPending || isPending2 || isPending3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numCabins={cabins?.length}
        numDays={numDays}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
