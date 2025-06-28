export function maskPhoneNumber(phone: string): string {
  if (!phone) return "";

  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, "");

  if (cleaned.startsWith("+7") && cleaned.length === 12) {
    // +77771234567 -> +7777***4567
    return `${cleaned.slice(0, 5)}***${cleaned.slice(-4)}`;
  }

  if (cleaned.startsWith("8") && cleaned.length === 11) {
    // 87771234567 -> 8777***4567
    return `${cleaned.slice(0, 4)}***${cleaned.slice(-4)}`;
  }

  if (cleaned.startsWith("7") && cleaned.length === 11) {
    // 77771234567 -> 7777***4567
    return `${cleaned.slice(0, 4)}***${cleaned.slice(-4)}`;
  }

  return phone;
}
