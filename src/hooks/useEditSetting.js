import toast from 'react-hot-toast';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updateSetting } from '../services/apiSettings';

function useEditSetting() {
  const queryClient = useQueryClient();

  const { mutate: editSetting, isPending: isEditing } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success('Setting berhasil diedit');
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editSetting, isEditing };
}

export default useEditSetting;
