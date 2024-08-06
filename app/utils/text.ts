export function truncate(text: string, truncateAt = 250) {
  return text.length > truncateAt ? text.slice(0, truncateAt) + '…' : text
}
