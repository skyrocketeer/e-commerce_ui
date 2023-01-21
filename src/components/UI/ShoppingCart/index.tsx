/* This example requires Tailwind CSS v2.0+ */
import { useState } from 'react';
import { PaymentMethod, ShopCart } from '~components/UI/Card';

export default function Example() {
  const [open, setOpen] = useState(true);

  return (
    // <div className='flex justify-center my-6'>
    <div className='flex flex-row w-full p-8 text-gray-800 bg-gray-50 pin-r pin-y my-6'>
      <div className='flex-initial w-2/3 shadow-lg bg-white p-6'>
        <ShopCart />
      </div>
      <div className='flex-initial w-1/3 shadow-lg bg-white ml-8'>
        <PaymentMethod />
      </div>
    </div>
    // </div>
  );
}
