import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { updateBooking } from '../services/apiBookings';

function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast = {} }) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Checkin booking #${data.id} berhasil`);
      queryClient.invalidateQueries({ active: true });
      navigate('/');
    },

    onError: () => {
      toast.error('Terjadi kesalahan saat melakukan checkin');
    },
  });

  return { checkin, isCheckingIn };
}

export default useCheckin;
