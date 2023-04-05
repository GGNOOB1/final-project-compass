import { Error } from 'src/interfaces/error';

export function formatErrors(error): Error {
  return {
    statusCode: error.statusCode,
    message: error.message,
    error: error.name,
  };
}
