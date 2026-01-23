import TeamSelection from './TeamSelection'

const SearchTeamComponent = () => {
  return (
    <div className="mb-2 grid grid-cols-1 gap-2 lg:grid-cols-2 lg:justify-between">
      <div className="flex max-w-[24rem] flex-col lg:w-full">
        <div>
          <TeamSelection field="teamId" label="Lag" />
        </div>
      </div>

      <div className="flex max-w-[18rem] flex-col">
        <div>
          <TeamSelection field="opponentId" label="Motståndare" />
        </div>
      </div>
    </div>
  )
}

export default SearchTeamComponent
