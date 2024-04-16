import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import useCreateCabin from '../../hooks/useCreateCabin';
import useEditCabin from '../../hooks/useEditCabin';

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: data.image[0] },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  function onError(data) {
    // console.log(data);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
        />
      </FormRow>

      <FormRow error={errors?.description?.message} label={'Deskripsi'}>
        <Textarea
          id='description'
          defaultValue=''
          {...register('description', { required: 'Baris ini harus diisi' })}
        />
      </FormRow>

      <FormRow error={errors?.image?.message} label={'Foto Fasilitas'}>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', {
            required: isEditSession ? false : 'Foto harus diupload',
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation='secondary'
          type='reset'
          onClick={() => onCloseModal?.()}
        >
          Batalkan
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit Fasilitas' : 'Tambah Fasilitas'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
