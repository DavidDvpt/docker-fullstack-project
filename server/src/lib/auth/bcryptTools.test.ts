import bcrypt from "bcrypt";
import encodeFunc from "./bcryptTools";
// Ensure the path is correct

// Mock the bcrypt module
jest.mock("bcrypt");

describe("encodeFunc", () => {
  const SALT_BOUNDS = 10;
  const mockValue = "testValue";
  const mockHash = "mockHash";

  // Clear and set up mocks before each test
  beforeEach(() => {
    (bcrypt.hash as jest.Mock).mockClear();
    (bcrypt.hash as jest.Mock).mockImplementation(
      (
        plainText: string,
        saltRounds: number,
        callback: (err: Error | null, hash: string | null) => void
      ) => {
        callback(null, mockHash); // Mock implementation returns mockHash without error
      }
    );
  });

  // Test to verify bcrypt.hash is called with correct arguments
  it("should hash the value with the correct salt bounds", async () => {
    await encodeFunc(mockValue);
    expect(bcrypt.hash).toHaveBeenCalledWith(
      mockValue,
      SALT_BOUNDS,
      expect.any(Function) // Ensure the third argument is a function
    );
  });

  // Test to verify the function returns the hashed value
  it("should return the hashed value", async () => {
    const result = await encodeFunc(mockValue);
    expect(result).toBe(mockHash); // Check if the result matches the mock hash
  });

  // Test to verify the function returns a string
  it("should return a string", async () => {
    const result = await encodeFunc(mockValue);
    expect(typeof result).toBe("string"); // Check if the result is a string
  });

  // Test to verify the function rejects with an error if bcrypt fails
  it("should reject with an error if bcrypt fails", async () => {
    const mockError = new Error("bcrypt error");
    (bcrypt.hash as jest.Mock).mockImplementationOnce(
      (
        plainText: string,
        saltRounds: number,
        callback: (err: Error | null, hash: string | null) => void
      ) => {
        callback(mockError, null); // Mock implementation returns an error
      }
    );

    await expect(encodeFunc(mockValue)).rejects.toThrow("bcrypt error"); // Check if the promise rejects with the correct error
  });
});
