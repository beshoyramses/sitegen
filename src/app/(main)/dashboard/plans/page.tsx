import React from 'react';

const Plans = () => {
  const plans = [
    {
      id: 1,
      name: 'Basic Plan',
      price: '$19/month',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      description: 'Perfect for individuals looking to get started.'
    },
    {
      id: 2,
      name: 'Standard Plan',
      price: '$49/month',
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
      description: 'Great for small teams or businesses.'
    },
    {
      id: 3,
      name: 'Premium Plan',
      price: '$99/month',
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
      description: 'Best for larger teams and enterprises.'
    }
  ];

  return (
    <div className='min-h-screen py-8'>
      <div className='container mx-auto px-4'>
        <h2 className='text-4xl font-bold text-center text-gray-100 mb-12'>
          Our Plans
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className='bg-gray-800 rounded-lg shadow-lg p-6 hover:bg-gray-700 transition duration-300'
            >
              <h3 className='text-2xl font-semibold text-gray-100 mb-4'>
                {plan.name}
              </h3>
              <p className='text-xl font-bold text-gray-300 mb-4'>
                {plan.price}
              </p>
              <p className='text-gray-400 mb-4'>{plan.description}</p>
              <ul className='list-disc list-inside text-gray-400 mb-6'>
                {plan.features.map((feature, index) => (
                  <li key={index} className='mb-2'>{feature}</li>
                ))}
              </ul>
              <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300'>
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Plans;
