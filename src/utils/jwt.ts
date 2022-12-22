import Jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';

async function signJwt(payload: string | Buffer | object) {
  return Jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
  });
}

export { signJwt };
