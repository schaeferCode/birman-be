export const convertToKey = (targetString: string): string => {
  // lowercase and turn spaces into dashes
  return targetString.split(' ').join('-').toLowerCase()
}
