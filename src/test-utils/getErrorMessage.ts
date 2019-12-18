export const getErrorMessage = (e: any): string => {
  return e?.response?.errors?.[0]?.message;
};
