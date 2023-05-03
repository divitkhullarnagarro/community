import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  fs.appendFile('./ErrorLogger.txt', JSON.stringify(req.body) + '\n', (error) => {
    if (error) console.log('logging error failed');
  });
  const requestMethod = req.method;
  switch (requestMethod) {
    case 'GET':
      //   const body = JSON.parse(req.body);
      res.status(200).json({ message: `You submitted the following data: }` });

    // handle other HTTP methods
    default:
      res.status(200).json({ message: 'Welcome to API Routes!' });
  }
}
