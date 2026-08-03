import { groupConstant } from '@/lib/utils/constants'
import PlayoffCard from './PlayoffCard'

type NilComponentProps = {
  group: string
}

const NilComponent = ({ group }: NilComponentProps) => {
  return (
    <PlayoffCard group={group}>
      <PlayoffCard.Title>
        <PlayoffCard.Group>
          {groupConstant[group]}
        </PlayoffCard.Group>
      </PlayoffCard.Title>
    </PlayoffCard>
  )
}

export default NilComponent
