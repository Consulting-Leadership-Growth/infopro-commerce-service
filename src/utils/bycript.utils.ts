import bycript from 'bcryptjs';

export class BycriptUtils {
  static async hashPassword(password: string): Promise<string> {
    const salt = await bycript.genSalt(10);
    return bycript.hash(password, salt);
  }

  static async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bycript.compare(password, hashedPassword);
  }
}
