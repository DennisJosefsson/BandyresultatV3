type CategoryName = {
  [key: string]: string
}

const categoryNames: CategoryName = {
  final: 'Final',
  'cup-final': 'Final',
  bronze: 'Bronsmatch',
  'cup-bronze': 'Bronsmatch',
  semi: 'Semifinal',
  'cup-semi': 'Semifinal',
  quarter: 'Kvartsfinal',
  'cup-quarter': 'Kvartsfinal',
  eight: 'Åttondelsfinal',
  playoffseries: 'Slutspelsserie',
  'cup-playoffseries': 'Slutspelsserie Cup',
  regular: 'Grundserie',
  'cup-regular': 'Grundserie',
  qualification: 'Kvalserie',
  'cup-qualification': 'Kvalserie Cup',
}

export function getDivisionName(division: string) {
  const divisionNum = Number(division)
  if (divisionNum === 1) return 'Högsta divisionen'
  if (divisionNum === 1.5)
    return 'Kval till högsta divisionen'
  if (divisionNum === 2) return 'Näst högsta divisionen'
  if (divisionNum === 2.5)
    return 'Kval till näst högsta divisionen'
  if (divisionNum === 3) return 'Tredje divisionen'
  if (divisionNum === 4) return 'Fjärde divisionen'
  if (divisionNum === 10) return 'Svenska Cupen'
  if (divisionNum === 11) return 'World Cup'
  if (divisionNum === 12) return 'Övriga cuper'
  return 'Lägsta divisionen'
}

export function getCategoryName(level: string) {
  const categoryName = categoryNames[level]
  if (!categoryName) return 'Okänt kategorinamn'
  return categoryName
}
