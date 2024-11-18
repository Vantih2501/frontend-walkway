export const urlFormatter = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, "-");
};

export const formatPhoneNumber = (phoneNumber: string | undefined) => {
  if (typeof phoneNumber !== "string") return "";

  let formattedNumber = phoneNumber.replace(/^\+62/, "+62 ");

  if (formattedNumber.length > 6) {
    formattedNumber = `${formattedNumber.slice(0, 7)}-${formattedNumber.slice(7, 11)}-${formattedNumber.slice(11, 16)}`;
  }

  return formattedNumber.trim();
}
