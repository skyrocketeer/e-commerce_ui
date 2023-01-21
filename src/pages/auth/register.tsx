export default function Register() {
  return (
    <div className='max-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-200 bg-no-repeat bg-cover relative items-center'>
      <div className='container mx-auto'>
        <div className='flex justify-center px-6 my-12'>
          <div className='w-full xl:w-3/4 lg:w-11/12 flex'>
            <div
              className='w-full h-auto hidden lg:block lg:w-5/12 bg-cover rounded-l-lg'
              style={{
                backgroundImage:
                  'url(https://source.unsplash.com/Mv9hjnEUHR4/600x800)',
              }}
            ></div>
            <div className='w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none'>
              <h3 className='pt-4 text-2xl text-center'>Create an Account!</h3>
              <form className='px-8 pt-6 pb-8 mb-4 bg-white rounded'>
                <div className='mb-4'>
                  {/* <div className='mb-4 md:mr-2 md:mb-0'> */}
                  <label
                    className='block mb-2 text-sm font-bold text-gray-700'
                    htmlFor='firstName'
                  >
                    Name
                  </label>
                  <input
                    className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                    id='firstName'
                    type='text'
                    placeholder='Fullname'
                  />
                  {/* </div> */}
                </div>
                <div className='mb-4'>
                  <label
                    className='block mb-2 text-sm font-bold text-gray-700'
                    htmlFor='email'
                  >
                    Email
                  </label>
                  <input
                    className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                    id='email'
                    type='email'
                    placeholder='Email'
                  />
                </div>
                <div className='mb-4 md:flex md:justify-between'>
                  <div className='mb-4 md:mr-2 md:mb-0'>
                    <label
                      className='block mb-2 text-sm font-bold text-gray-700'
                      htmlFor='password'
                    >
                      Password
                    </label>
                    <input
                      className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                      id='password'
                      type='password'
                      placeholder='******************'
                    />
                    <p className='text-xs italic text-red-500'>
                      Please choose a password.
                    </p>
                  </div>
                  <div className='md:ml-2'>
                    <label
                      className='block mb-2 text-sm font-bold text-gray-700'
                      htmlFor='c_password'
                    >
                      Confirm Password
                    </label>
                    <input
                      className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                      id='c_password'
                      type='password'
                      placeholder='******************'
                    />
                  </div>
                </div>
                <div className='space-x-2'>
                  <button
                    type='submit'
                    className='w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500'
                  >
                    Create an account
                  </button>
                </div>
                <hr className='mb-6 border-t' />
                <div className='text-center'>
                  <a
                    className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'
                    href='/auth/login'
                  >
                    Already have an account? Login!
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
