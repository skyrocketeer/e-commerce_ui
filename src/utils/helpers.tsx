export function mergeClassNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const isClient = typeof window !== 'undefined';

const PUBLIC_ROUTES = ['/api/auth/login', '/api/auth/register'];

export const isPublicRoute = (route: string) => PUBLIC_ROUTES.includes(route);

export const LOG_OUT_PATH = '/api/auth/logout';

export const formatNumber = function (n: number, delimiter: string = ',') {
  return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${delimiter}`);
};

export const isNotEmpty = (valueToCheck: any) => {
  return (
    valueToCheck !== undefined &&
    valueToCheck !== null &&
    valueToCheck.toString().trim() !== ''
  );
};

export const isOnlyAlphabet = (value: any) => {
  return /^[a-z]+$/i.test(value.toString());
};

export const isOnlyNumber = (value: any) => !/^\d+$/.test(value);
