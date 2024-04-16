import toast from 'react-hot-toast';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteBooking as deleteBookingApi } from '../services/apiBookings';

function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (id) => deleteBookingApi(id),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });

      toast.success(`Booking #${data} berhasil dihapus`);
    },

    onError: () => toast.error('Booking tidak dapat dihapus'),
  });

  return { isDeleting, deleteBooking };
}

export default useDeleteBooking;
