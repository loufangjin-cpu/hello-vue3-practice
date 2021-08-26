export function fetchData(count = 30) {
  const result = []
  for (let i = 0; i < count; i++) {
    result.push({
      name: `count${i}`,
      id: `count${i}`
    })
  }
  return result
}
