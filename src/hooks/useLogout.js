import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLogout } = useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/login', { replace: true });
      toast.success('Anda telah keluar dari aplikasi');
    },
  });

  return { logout, isLogout };
}

export default useLogout;
