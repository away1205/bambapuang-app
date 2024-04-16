import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLogin } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
      navigate('/dashboard', { replace: true });
    },

    onError: (err) => {
      console.log('ERROR: ', err);
      toast.error('Email atau password yang dimasukkan salah');
    },
  });

  return { login, isLogin };
}

export default useLogin;
