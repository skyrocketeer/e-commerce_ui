import FacebookIcon from 'components/icons/Facebook';
import GoogleIcon from 'components/icons/Google';
import TwitterIcon from 'components/icons/Twitter';
import { useRouter } from 'next/dist/client/router';
import { useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AuthContext } from '~features/auth/context';
import { useLogin } from '~hooks/auth';
import { LoginPayload } from '~types/auth';

export default function Login({
  state,
}: {
  state: boolean;
  setModal: Function;
}) {
  const router = useRouter();
  const { dispatch } = useContext(AuthContext);
  // we need to keep a reference of the toastId to be able to update it
  const toastId = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginPayload>();

  const onSubmit = async (data: LoginPayload) => {
    // if (toastId.current === null) {
    //   toastId.current = toast.loading('Please wait...');
    // }
    await useLogin(data, dispatch)
      .then(() => {
        toast.success('🦄 Login successfully');
        router.push('/about');
      })
      .catch(() => toast.error('Error occured'));
  };
  const bgUrl =
    'url(https://images.unsplash.com/photo-1525302220185-c387a117886e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)';

  <div className='absolute bg-black opacity-60 inset-0 z-0'></div>;
  const LoginForm = () => (
    <div className='max-w-md w-full'>
      <div className='flex flex-row justify-center items-center space-x-5 my-3'>
        <a
          href='https://www.behance.net/ajeeshmon'
          target='_blank'
          className='w-8 h-8 items-center justify-center inline-flex rounded-2xl font-bold text-lg hover:shadow-lg cursor-pointer transition ease-in duration-300'
        >
          <FacebookIcon className='w-8 h-8' />
        </a>
        <a
          href='#'
          target='_blank'
          className='w-8 h-8 items-center justify-center inline-flex rounded-2xl font-bold text-lg  text-white hover:shadow-lg cursor-pointer transition ease-in duration-300'
        >
          <GoogleIcon className='w-8 h-8' />
        </a>
        <a
          href='https://in.linkedin.com/in/ajeeshmon'
          target='_blank'
          className='w-8 h-8 items-center justify-center inline-flex rounded-2xl font-bold text-lg  text-white hover:shadow-lg cursor-pointer transition ease-in duration-300'
        >
          <TwitterIcon className='w-8 h-8' />
        </a>
      </div>
      <div className='flex items-center justify-center space-x-2'>
        <span className='h-px w-16 bg-gray-200'></span>
        <span className='text-gray-300 font-normal'>or continue with</span>
        <span className='h-px w-16 bg-gray-200'></span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-6'>
        <input type='hidden' name='remember' value='true' />
        <div className='relative'>
          {/* <div className='absolute right-3 mt-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-green-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              ></path>
            </svg>
          </div> */}
          <label className='ml-3 text-sm font-bold text-gray-700 tracking-wide'>
            Email
          </label>
          <input
            className=' w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500'
            type='text'
            placeholder='Enter your email address'
            {...register('email', { required: true })}
          />
          {errors.email?.type === 'required' && 'Email is required'}
        </div>
        <div className='mt-8 content-center'>
          <label className='ml-3 text-sm font-bold text-gray-700 tracking-wide'>
            Password
          </label>
          <input
            className='w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500'
            type='password'
            placeholder='Enter your password'
            {...register('password', { required: true })}
          />
          {errors.password?.type === 'required' && 'Password is required'}
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <input
              id='remember_me'
              name='remember_me'
              type='checkbox'
              className='h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded'
            />
            <label
              htmlFor='remember_me'
              className='ml-2 block text-sm text-gray-900'
            >
              Remember me
            </label>
          </div>
          <div className='text-sm'>
            <a href='#' className='text-indigo-400 hover:text-blue-500'>
              Forgot your password?
            </a>
          </div>
        </div>
        <div className='space-x-2'>
          <button className='w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500'>
            Sign in
          </button>
        </div>
        <p className='flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500'>
          <span>Don't have an account?</span>
          <a
            href='/auth/register'
            className='text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300'
          >
            Sign up
          </a>
        </p>
      </form>
    </div>
  );

  return (
    <div
      className='max-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center'
      style={{ backgroundImage: bgUrl }}
    >
      <div className='absolute bg-black opacity-60 inset-0 z-0'></div>
      <div className='max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10'>
        <span className='mt-3 text-3xl font-bold text-gray-900'>
          Welcome Back!
        </span>
        <p className='mt-2 text-sm text-gray-500'>
          Please sign in to your account
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
