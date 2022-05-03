/**
 * take file as an input and return base64 string
 * @param file Input file
 * @returns Promise<String>
 */
export const binaryToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Check whether given data is empty or not
 * @param {any} data Any input data
 * @returns
 */
export const isEmpty = (data) =>
  data === undefined ||
  data === null ||
  (typeof data === "object" && Object.keys(data).length === 0) ||
  data.length === 0;
