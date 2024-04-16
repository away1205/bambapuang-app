import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

import useUpdateUser from '../../hooks/useUpdateUser';

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label='Password (min 8 characters)'
        error={errors?.password?.message}
      >
        <Input
          type='password'
          id='password'
          autoComplete='current-password'
          disabled={isUpdating}
          {...register('password', {
            required: 'password harus diisi',
            minLength: {
              value: 8,
              message: 'Password harus diatas 8 karakter',
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Konfirmasi password'
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type='password'
          autoComplete='new-password'
          id='passwordConfirm'
          disabled={isUpdating}
          {...register('passwordConfirm', {
            required: 'konfirmasi password harus diisi',
            validate: (value) => {
              return value === getValues().password || 'Password harus sesuai';
            },
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={reset} type='reset' variation='secondary'>
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
