import { IconType } from '~types/icon';

const PencilIcon = ({ className, color }: IconType) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={className ? className : 'h-6 w-6'}
    fill={color || 'none'}
    viewBox='0 0 24 24'
    stroke={color || 'currentColor'}
  >
    <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
  </svg>
);

export default PencilIcon;
