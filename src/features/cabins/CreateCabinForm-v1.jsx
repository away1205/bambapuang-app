import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { createCabin } from '../../services/apiCabins';

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('Fasilitas baru telah ditambah');
      queryClient.invalidateQueries({
        queryKey: ['cabin'],
      });
      reset();
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }

  function onError(data) {
    // console.log(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow error={errors?.name?.message} label={'Nama Fasilitas'}>
        <Input
          type='text'
          id='name'
          {...register('name', { required: 'Baris ini harus diisi' })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow
        error={errors?.maxCapacity?.message}
        label={'Kapasitas Maksimum'}
      >
        <Input
          type='number'
          id='maxCapacity'
          {...register('maxCapacity', {
            required: 'Baris ini harus diisi',
            min: { value: 1, message: 'Kapasitas paling sedikit 1 tamu' },
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow error={errors?.regularPrice?.message} label={'Harga'}>
        <Input
          type='number'
          id='regularPrice'
          {...register('regularPrice', {
            required: 'Baris ini harus diisi',
            min: { value: 1, message: 'Fasilitas harus memiliki harga' },
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow error={errors?.discount?.message} label={'Diskon'}>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          {...register('discount', {
            required: 'Baris ini harus diisi',
            validate: (value) =>
              value <= getValues().regularPrice ||
              'Diskon tidak boleh melebihi harga fasilitas',
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow error={errors?.description?.message} label={'Deskripsi'}>
        <Textarea
          id='description'
          defaultValue=''
          {...register('description', { required: 'Baris ini harus diisi' })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow error={errors?.image?.message} label={'Foto Fasilitas'}>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', { required: 'Foto harus diupload' })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Batalkan
        </Button>
        <Button disabled={isCreating}>Tambah Fasilitas</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
