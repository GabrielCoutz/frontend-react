export const capitalize = (word: string) => {
  const capitalizedLetter = word[0].toUpperCase()
  const capitalizedWord = capitalizedLetter + word.slice(1)
  return capitalizedWord
}
