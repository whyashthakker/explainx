export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);

  // Generate a random salt
  const salt = crypto.getRandomValues(new Uint8Array(16));

  // Hash the password with the salt
  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new Uint8Array([...salt, ...data]),
  );

  // Convert the hash to Base64
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashBase64 = btoa(String.fromCharCode(...hashArray));

  // Convert salt to Base64
  const saltBase64 = btoa(String.fromCharCode(...salt));

  // Return combined salt and hash
  return `${saltBase64}:${hashBase64}`;
}

export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  const [saltBase64, hashBase64] = hashedPassword.split(":");

  // Decode the salt
  const salt = Uint8Array.from(atob(saltBase64), (c) => c.charCodeAt(0));

  const encoder = new TextEncoder();
  const data = encoder.encode(password);

  // Hash the password with the same salt
  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new Uint8Array([...salt, ...data]),
  );

  // Convert to Base64 for comparison
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const newHashBase64 = btoa(String.fromCharCode(...hashArray));

  return hashBase64 === newHashBase64;
}
