export const formatDate = (date: Date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as const

  const now = date.toLocaleDateString("en-US", options)

  return now
}