
export const NOT_VALID_VALUES = [null, undefined, '', []];

export const COOKIE_GAME_KEY = 'game_key';

export const cookieOptions = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      secure: true,
      sameSite: 'lax',
    };
  }
  return {};
};
