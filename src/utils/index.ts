export const jsonParse = <T>(str: string, fallback: T) => {
  try {
    if (!str) throw new Error();
    return JSON.parse(str) as T;
  } catch (error) {
    return fallback;
  }
};
