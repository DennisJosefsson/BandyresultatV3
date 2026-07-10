import { groupConstant } from '@/lib/utils/constants'
import PlayoffCard from './PlayoffCard'

type ColstartsType = {
  [key: string]: string
}

type NilComponentProps = {
  group: string
  colStarts: ColstartsType
}

const NilComponent = ({
  group,
  colStarts,
}: NilComponentProps) => {
  const styleClass = colStarts
    ? `${colStarts[group]} bg-background p-2`
    : 'bg-background p-2 md:col-start-4 md:odd:col-start-2'

  return (
    <PlayoffCard
      group={group}
      styleClass={styleClass}
    >
      <PlayoffCard.Title>
        <PlayoffCard.Group>
          {groupConstant[group]}
        </PlayoffCard.Group>
      </PlayoffCard.Title>
      <PlayoffCard.Content>
        <h4 className="text-sm">Inga matcher än</h4>
      </PlayoffCard.Content>
    </PlayoffCard>
  )
}

export default NilComponent
