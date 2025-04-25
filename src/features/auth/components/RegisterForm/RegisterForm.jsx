import classes from './RegisterForm.module.css'
import { useForm } from 'react-hook-form'
import { useRegister } from '../../hooks/useRegister'
import { useAuthStore } from '../../stores/useAuthStore'
import Button from '@/components/ui/Button/Button'
import Input from '@/components/ui/Input/Input'

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const { register: registerUser } = useRegister()
  const isLoading = useAuthStore((state) => state.isLoading)
  const password = watch('password')

  const onSubmit = (data) => {
    registerUser({
      email: data.email,
      password: data.password,
      username: data.username,
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Input
        label="Username"
        {...register('username', {
          required: 'Username is required',
          minLength: {
            value: 3,
            message: 'Username must be at least 3 characters',
          },
        })}
        error={errors.username?.message}
        autoComplete="username"
        className={classes.input}
      />

      <Input
        label="Email"
        type="email"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        })}
        error={errors.email?.message}
        autoComplete="email"
        className={classes.input}
      />

      <Input
        label="Password"
        type="password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
        })}
        error={errors.password?.message}
        autoComplete="new-password"
        className={classes.input}
      />

      <Input
        label="Confirm Password"
        type="password"
        {...register('confirmPassword', {
          required: 'Please confirm your password',
          validate: (value) =>
            value === password || 'Passwords do not match',
        })}
        error={errors.confirmPassword?.message}
        autoComplete="new-password"
        className={classes.input}
      />

      <Button
        type="submit"
        variant="primary"
        size="medium"
        disabled={isLoading}
        className={classes.button}
      >
        {isLoading ? (
          <>
            <span style={{ marginRight: '8px' }}>
              <i class="fa fa-circle-o-notch fa-spin"></i>
            </span>
            Registering
          </>
        ) : (
          'Register'
        )}
      </Button>
    </form>
  );
}

export default RegisterForm