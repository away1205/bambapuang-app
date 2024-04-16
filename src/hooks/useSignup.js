import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../services/apiAuth';
import toast from 'react-hot-toast';

function useSignup() {
  const { mutate: signup, isPending: isSignup } = useMutation({
    mutationFn: signupApi,

    onSuccess: (data) => {
      toast.success(
        `Akun ${data?.user?.user_metadata.fullName} baru telah dibuat, silahkan konfirmasi email yang telah dikirim`
      );
    },
  });

  return { signup, isSignup };
}

export default useSignup;
