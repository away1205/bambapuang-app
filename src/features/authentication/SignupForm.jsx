import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import useSignup from '../../hooks/useSignup';
import SpinnerMini from '../../ui/SpinnerMini';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const { signup, isSignup } = useSignup();

  function onSubmit({ fullName, email, password }) {
    signup({ fullName, email, password }, { onSettled: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Nama lengkap' error={errors?.fullName?.message}>
        <Input
          type='text'
          id='fullName'
          {...register('fullName', { required: 'Nama harus diisi' })}
          disabled={isSignup}
        />
      </FormRow>

      <FormRow label='Email address' error={errors?.email?.message}>
        <Input
          type='email'
          id='email'
          {...register('email', {
            required: 'Email harus diisi',
            pattern: { value: /\S+@\S+\.\S+/, message: 'Email tidak valid' },
          })}
          disabled={isSignup}
        />
      </FormRow>

      <FormRow
        label='Password (min 8 characters)'
        error={errors?.password?.message}
      >
        <Input
          type='password'
          id='password'
          {...register('password', {
            required: 'password harus diisi',
            minLength: {
              value: 8,
              message: 'Password harus diatas 8 karakter',
            },
          })}
          disabled={isSignup}
        />
      </FormRow>

      <FormRow
        label='Konfirmasi password'
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type='password'
          id='passwordConfirm'
          {...register('passwordConfirm', {
            required: 'konfirmasi password harus diisi',
            validate: (value) => {
              return value === getValues().password || 'Password harus sesuai';
            },
          })}
          disabled={isSignup}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Batalkan
        </Button>
        <Button disabled={isSignup}>
          {isSignup ? <SpinnerMini /> : 'Buat akun baru'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
