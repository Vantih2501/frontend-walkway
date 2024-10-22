export const urlFormatter = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '-');
};