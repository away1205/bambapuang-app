import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateBooking } from '../services/apiBookings';

function useCheckOut() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: 'checked-out' }),
    onSuccess: (data) => {
      toast.success(`Checkout booking #${data.id} berhasil`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => {
      toast.error('Terjadi kesalahan saat melakukan checkout');
    },
  });

  return { checkout, isCheckingOut };
}

export default useCheckOut;
