import toast from 'react-hot-toast';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createEditCabin as createCabinApi } from '../services/apiCabins';

function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createCabinApi,
    onSuccess: () => {
      toast.success('Fasilitas baru telah ditambah');
      queryClient.invalidateQueries({
        queryKey: ['cabin'],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createCabin, isCreating };
}

export default useCreateCabin;
