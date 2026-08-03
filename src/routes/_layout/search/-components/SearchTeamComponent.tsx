import TeamSelection from './TeamSelection'

const SearchTeamComponent = () => {
  return (
    <div className="mb-2 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:justify-between">
      <div className="flex max-w-4/5 flex-col lg:w-full">
        <TeamSelection field="teamId" label="Lag" />
      </div>

      <div className="flex max-w-4/5 flex-col lg:w-full">
        <TeamSelection field="opponentId" label="Motståndare" />
      </div>
    </div>
  )
}

export default SearchTeamComponent
