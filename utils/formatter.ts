export const urlFormatter = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, "-");
};

export const formatPhoneNumber = (phoneNumber: string | undefined) => {
  // Ensure phoneNumber is a string
  if (typeof phoneNumber !== "string") return "";

  let formattedNumber = phoneNumber.replace(/^\+62/, "+62 ");

  // Apply the format '812-3456-7891-2'
  if (formattedNumber.length > 6) {
    formattedNumber = `${formattedNumber.slice(0, 7)}-${formattedNumber.slice(7, 11)}-${formattedNumber.slice(11, 16)}`;
  }

  return formattedNumber.trim();
}
