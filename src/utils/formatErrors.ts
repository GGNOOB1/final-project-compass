// Lembrar do if validation

export function formatErrors(error) {
  return {
    statusCode: error.statusCode,
    message: error.message,
    error: error.name,
  };
}
