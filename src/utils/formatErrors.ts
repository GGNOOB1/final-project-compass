import { Error } from 'src/interfaces/error';

export function formatErrors(error): Error {
  return {
    statusCode: error.statusCode || error.response.statusCode,
    message: error.message || error.response.message,
    error: error.name || error.response.name,
  };
}
