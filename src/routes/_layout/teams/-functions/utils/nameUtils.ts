type CategoryName = {
  [key: string]: string
}

const categoryNames: CategoryName = {
  final: 'Final',
  cupFinal: 'Final',
  semi: 'Semifinal',
  cupSemi: 'Semifinal',
  quarter: 'Kvartsfinal',
  cupQuarter: 'Cupkvartsfinal',
  eight: 'Åttondelsfinal',
  playoffseries: 'Slutspelsserie',
  cupPlayoffseries: 'Slutspelsserie Cup',
  regular: 'Grundserie',
  cupRegular: 'Grundserie Cup',
  qualification: 'Kvalserie',
}

export function getLevelName(level: string) {
  const levelNum = Number(level)
  if (levelNum <= 1.5) return 'Högsta divisionen'
  if (levelNum <= 1.9) return 'Svenska Cupen'
  if (levelNum <= 2.5) return 'Näst högsta divisionen'
  if (levelNum <= 2.9) return 'Allsvensk cup'
  if (levelNum < 4) return 'Tredje divisionen'
  if (levelNum < 5) return 'Fjärde divisionen'
  return 'Lägsta divisionen'
}

export function getCategoryName(level: string) {
  const categoryName = categoryNames[level]
  if (!categoryName) return 'Okänt kategorinamn'
  return categoryName
}
