export const removePasswordInArrays = (array: any[]) => {
  try {
    for (let i = 0; i < array.length; i++) {
      delete array[i].password;
    }
  } catch (e) {
    return {
      message: e.message,
    };
  }
};
