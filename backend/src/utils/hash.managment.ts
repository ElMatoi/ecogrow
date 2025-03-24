import { hash, compare } from "bcryptjs";
import { getEnvValue } from "src/config/config.service";

export async function createHash(element: string): Promise<string> {
  return await hash(
    element + getEnvValue("SECRET_SALT"),
    +getEnvValue("SALT_ROUNDS"),
  );
}

export async function compareHash(
  element: string,
  hashedElement: string,
): Promise<boolean> {
  return await compare(element + getEnvValue("SECRET_SALT"), hashedElement);
}