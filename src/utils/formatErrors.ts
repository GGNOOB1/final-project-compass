import { Error } from 'src/interfaces/error';

// Lembrar do if validation
export function formatErrors(error): Error {
  return {
    statusCode: error.statusCode,
    message: error.message,
    error: error.name,
  };
}
