export const toDateInputValue = (value: string): string => {
  if (!value) {
    return "";
  }

  return value.slice(0, 10);
};
