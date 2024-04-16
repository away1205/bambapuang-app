import getCabins from '../services/apiCabins';
import { useQuery } from '@tanstack/react-query';

function useCabin() {
  const {
    isPending,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ['cabin'],
    queryFn: getCabins,
  });

  return { isPending, cabins, error };
}

export default useCabin;
