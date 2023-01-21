export const PaymentMethod = () => (
  <div className='p-6'>
    <div className='space-y-3'>
      <div className='flex text-sm'>
        <div className='w-1/2 text-gray-400'>Transaction code</div>
        <div className='w-1/2 text-right'>TDGVG03</div>
      </div>
      <div className='flex items-center text-sm'>
        <div className='w-1/2'>
          <input
            className='border border-gray-200 px-3 rounded-lg h-8'
            placeholder='Promo code'
          />
        </div>
        <div className='w-1/2 text-right'>
          <button className='px-4 py-1 bg-teal-200 text-teal-500 rounded-md'>
            Apply
          </button>
        </div>
      </div>
    </div>
    <hr className='my-6 border-t border-dashed border-gray-200' />
    <div className='space-y-3'>
      <div className='flex text-sm'>
        <div className='w-1/2 text-gray-400'>Order summary</div>
        <div className='w-1/2 text-right'>$50.00</div>
      </div>
      <div className='flex text-sm'>
        <div className='w-1/2 text-gray-400'>Shipping fee</div>
        <div className='w-1/2 text-right'>$5.00</div>
      </div>
      <div className='flex text-sm'>
        <div className='w-1/2 text-gray-400'>Discount</div>
        <div className='w-1/2 text-right'>$0.00</div>
      </div>
      <div className='flex text-sm'>
        <div className='w-1/2 text-gray-400'>Total amount</div>
        <div className='w-1/2 text-right'>$55.00</div>
      </div>
    </div>
    <div className='text-center mt-5'>
      <button className='w-2/3 bg-blue-500 text-white py-2 px-3 rounded-full'>
        Proceed to checkout
      </button>
    </div>
  </div>
);
