import toast from 'react-hot-toast';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createEditCabin as editCabinApi } from '../services/apiCabins';

function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => editCabinApi(newCabinData, id),
    onSuccess: () => {
      toast.success('Fasilitas berhasil diedit');
      queryClient.invalidateQueries({
        queryKey: ['cabin'],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editCabin, isEditing };
}

export default useEditCabin;
