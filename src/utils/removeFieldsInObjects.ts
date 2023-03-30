export const removeFieldsInObjects = (
  object: object | object[],
  fields: string[],
): object => {
  try {
    fields.forEach((field) => delete object[field]);
    return object;
  } catch (e) {
    return {
      message: e.message,
    };
  }
};
