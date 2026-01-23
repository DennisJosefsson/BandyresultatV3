import { Categories, OperatorValues } from '@/lib/types/search'

export const orderSelection: { value: OperatorValues; label: string }[] = [
  { value: 'asc', label: 'Stigande' },
  { value: 'desc', label: 'Fallande' },
]

export const orderVariableSelection: {
  value: OperatorValues
  label: string
}[] = [
  { value: 'date', label: 'Datum' },
  { value: 'totalGoals', label: 'Antal mål' },
  { value: 'goalDifference', label: 'Målskillnad' },
  { value: 'goalsScored', label: 'Gjorda mål' },
  { value: 'goalsConceded', label: 'Insläppta mål' },
]

export const selectedGenderArray = [
  { value: 'all', label: 'Alla' },
  { value: 'men', label: 'Herrar' },
  { value: 'women', label: 'Damer' },
]

export const homeGameArray = [
  { value: 'all', label: 'Alla' },
  { value: 'home', label: 'Hemma' },
  { value: 'away', label: 'Borta' },
]

export const gameResultArray = [
  { value: 'all', label: 'Alla' },
  { value: 'win', label: 'Vinst' },
  { value: 'lost', label: 'Förlust' },
  { value: 'draw', label: 'Oavgjort' },
]

export const operatorSelection: { value: OperatorValues; label: string }[] = [
  { value: 'gte', label: 'Lika eller större än' },
  { value: 'lte', label: 'Lika eller mindre än' },
  { value: 'eq', label: 'Lika' },
]

export const categoryArrayValues: { category: Categories; name: string }[] = [
  { category: 'regular', name: 'Grundserie' },
  { category: 'qualification', name: 'Kvalserie' },
  { category: 'playoffseries', name: 'Slutspelsserie' },
  { category: 'eight', name: 'Åttondel' },
  { category: 'quarter', name: 'Kvartsfinal' },
  { category: 'semi', name: 'Semifinal' },
  { category: 'final', name: 'Final' },
]

export const levelArray = [
  { value: '1.0', label: 'Högsta divisionen' },
  { value: '1.5', label: 'Kval till högsta divisionen' },
  { value: '2.0', label: 'Näst högsta divisionen' },
  { value: '2.5', label: 'Kval till näst högsta divisionen' },
  { value: '3.0', label: 'Tredje divisionen' },
]

export const limitSelection = [
  { value: '5', label: '5' },
  { value: '10', label: '10' },
  { value: '15', label: '15' },
  { value: '20', label: '20' },
  { value: '50', label: '50' },
]
