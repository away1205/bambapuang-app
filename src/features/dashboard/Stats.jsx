import {
  HiBriefcase,
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings, confirmedStays, numDays, numCabins }) {
  const numBookings = bookings.length;

  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const checkins = confirmedStays.length;

  // num checkin nights / all available nights (num days * num cabins)
  const occupancyRate =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * numCabins);

  return (
    <>
      <Stat
        title={'Booking'}
        color='blue'
        icon={<HiBriefcase />}
        value={numBookings}
      />
      <Stat
        title={'Sales'}
        color='green'
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title={'Check-in'}
        color='indigo'
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title={'Occupancy rate'}
        color='yellow'
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancyRate * 100) + '%'}
      />
    </>
  );
}

export default Stats;
