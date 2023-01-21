import CounterInput from '~components/UI/Input/Counter';
import { mergeClassNames } from '~utils/helpers';

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    discount: '$20.00',
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt:
      'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    discount: '',
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
];

export const ShopCart = () => (
  <table className='w-full text-sm lg:text-base' cellSpacing='0'>
    <thead>
      <tr className='h-12'>
        <th className='md:table-cell'></th>
        <th className='text-left w-[40%]'>Product</th>
        <th className='hidden text-center md:table-cell w-[30%]'>Unit price</th>
        <th className='text-left lg:pl-0 w-[15%]'>Quantity</th>
      </tr>
    </thead>
    <tbody>
      {products.map((p) => (
        <tr key={p.id}>
          <td className='pb-4 md:table-cell'>
            <a href='#'>
              <img src={p.imageSrc} className='w-20 rounded' alt={p.imageAlt} />
            </a>
          </td>
          <td>
            <a href='#'>
              <p className='mb-2 md:ml-4'>{p.name}</p>
            </a>
          </td>
          <td className='text-center md:table-cell text-sm lg:text-base font-medium'>
            {p.discount && (
              <span className='text-red-400 mr-4'>{p.discount}</span>
            )}
            <span
              className={mergeClassNames(
                p.discount ? 'line-through' : '',
                'text-gray-400'
              )}
            >
              {p.price}
            </span>
          </td>
          <td className=''>
            <CounterInput />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
