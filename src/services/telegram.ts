/**
 * Represents user data obtained from Telegram.
 */
export interface TelegramUserData {
  /**
   * The unique identifier for the user.
   */
  id: number;
  /**
   * The user's first name.
   */
  first_name: string;
  /**
   * The user's last name (optional).
   */
  last_name?: string;
  /**
   * The user's username (optional).
   */
  username?: string;
  /**
   * The user's language code (optional).
   */
  language_code?: string;
  /**
   * The user's photo URL (optional).
   */
  photo_url?: string;
}

/**
 * Validates the Telegram initData and retrieves user data.
 *
 * @param initData The initData string from Telegram.
 * @returns A promise that resolves to a TelegramUserData object if validation is successful.
 * @throws An error if the initData is invalid.
 */
export async function validateTelegramInitData(
  initData: string
): Promise<TelegramUserData> {
  // TODO: Implement the validation logic using Telegram SDK or a custom implementation.
  // This is a placeholder implementation.

  //Simulate data returned from Telegram
  const userData: TelegramUserData = {
    id: 123456789,
    first_name: 'John',
    last_name: 'Doe',
    username: 'johndoe',
    language_code: 'en',
    photo_url: 'https://example.com/photo.jpg',
  };

  return userData;
}
