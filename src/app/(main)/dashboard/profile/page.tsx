import React from 'react';

const ManageProfile = () => {
  return (
    <div className='min-h-screen bg-gray-900 py-7'>
      <div className='container mx-auto px-4'>
        <div className='bg-gray-800 rounded-lg shadow-lg p-8'>
          <div className='flex flex-col items-center mb-8'>
            <img
              src='https://via.placeholder.com/150'
              alt='Profile'
              className='w-32 h-32 object-cover rounded-full mb-4'
            />
            <h3 className='text-3xl font-semibold text-gray-100 mb-2'>
              John Doe
            </h3>
            <p className='text-gray-400'>johndoe@example.com</p>
          </div>
          <form className='space-y-6'>
            <div>
              <label className='block text-gray-400 mb-2' htmlFor='name'>
                Name
              </label>
              <input
                id='name'
                type='text'
                className='w-full p-3 bg-gray-700 rounded-md text-gray-100 border border-gray-600 focus:outline-none focus:border-blue-500'
                defaultValue='John Doe'
              />
            </div>
            <div>
              <label className='block text-gray-400 mb-2' htmlFor='email'>
                Email
              </label>
              <input
                id='email'
                type='email'
                className='w-full p-3 bg-gray-700 rounded-md text-gray-100 border border-gray-600 focus:outline-none focus:border-blue-500'
                defaultValue='johndoe@example.com'
              />
            </div>
            <div>
              <label className='block text-gray-400 mb-2' htmlFor='password'>
                Password
              </label>
              <input
                id='password'
                type='password'
                className='w-full p-3 bg-gray-700 rounded-md text-gray-100 border border-gray-600 focus:outline-none focus:border-blue-500'
                placeholder='********'
              />
            </div>
            <div>
              <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300'>
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManageProfile;
