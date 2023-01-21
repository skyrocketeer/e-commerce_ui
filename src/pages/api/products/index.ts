import { NextApiRequest, NextApiResponse } from 'next';
import { products } from 'pages/index';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(products);
}
