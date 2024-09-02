import { Request, Response, NextFunction } from 'express';
import { verify, decode } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET as string;

interface AuthenticatedRequest extends Request {
  usuarioId?: string;
  usuarioEmail?: string;
}

const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json('Access token não informado');
  }

  const [, accessToken] = token.split(' ');

  try {
    verify(accessToken, secret);

    const decodedToken = decode(accessToken) as {
      id: string;
      email: string;
    } | null;

    if (decodedToken) {
      req.usuarioId = decodedToken.id;
      req.usuarioEmail = decodedToken.email;
    }

    return next();
  } catch (error) {
    return res.status(401).send('Usuário não autorizado');
  }
};

export default authenticate;
