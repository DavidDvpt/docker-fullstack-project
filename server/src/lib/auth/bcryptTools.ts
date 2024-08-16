import bcrypt from "bcrypt";

const SALT_BOUNDS = 10;

/**
 * Asynchronous function to hash a plain text using bcrypt.
 * @param plainText - The plain text to be hashed.
 * @returns A promise that resolves to the hashed value.
 */
async function encodeFunc(plainText: string): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plainText, SALT_BOUNDS, (err, hash) => {
      if (err) return reject(err); // Reject the promise if an error occurs
      if (hash) return resolve(hash); // Resolve the promise with the hashed value
      return reject({ message: "bcrypt hash crashed" }); // Reject if no hash is returned
    });
  });
}

export default encodeFunc;
