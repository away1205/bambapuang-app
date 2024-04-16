import toast from 'react-hot-toast';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteCabin as deleteCabinApi } from '../services/apiCabins';

function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinApi(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabin'],
      });

      toast.success('Fasilitas berhasil dihapus');
    },

    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}

export default useDeleteCabin;
