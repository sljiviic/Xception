import classes from './LoginForm.module.css'
import { useForm, useWatch } from 'react-hook-form'
import { useLogin } from '../../hooks/useLogin'
import Button from '@/components/ui/Button/Button'
import Input from '@/components/ui/Input/Input'
import { useEffect } from 'react'


const LoginForm = ({ onSuccess, values, setValues }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: values,
  })
  const watched = useWatch({ control })
  const { login, isLoading } = useLogin()

  useEffect(() => {
    setValues?.({ login: watched?.login, password: watched?.password })
  }, [watched, setValues])

  const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

  const onSubmit = async (data) => {
    const credentials = {
      [isEmail(data.login) ? 'email' : 'username']: data.login,
      password: data.password
    }
    try {
      await login(credentials)
      onSuccess?.()
      reset({ login: '', password: '' })
      setValues({ login: '', password: '' })
    } catch (error) {
      console.error('Login failed', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Input
        label='Username/Email'
        {...register('login', {
          required: 'Email or username is required',
          validate: {
            valid: (value) =>
              isEmail(value) || value.length >= 3 ||
              'Must be a valid email or at least 3 characters'
          }
        })}
        error={errors.login?.message}
        autoComplete='username'
        className={classes.input}
      />

      <Input
        label='Password'
        type='password'
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters'
          }
        })}
        error={errors.password?.message}
        autoComplete='current-password'
        className={classes.input}
      />

      <Button
        type='submit'
        variant='primary'
        size='medium'
        disabled={isLoading}
        className={classes.button}
      >
        {isLoading ? (
          <>
            <span style={{ marginRight: '8px' }}>
              <i className='fa fa-circle-o-notch fa-spin'></i>
            </span>
            Logging in
          </>
        ) : (
          'Log In'
        )}
      </Button>
    </form>
  )

}

export default LoginForm