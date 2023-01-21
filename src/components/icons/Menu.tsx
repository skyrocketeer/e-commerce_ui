import { IconType } from '~types/icon';

export const MenuIcon = ({ className }: IconType) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={className ? className : 'h-6 w-6'}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M4 6h16M4 12h16m-7 6h7'
    />
  </svg>
);
