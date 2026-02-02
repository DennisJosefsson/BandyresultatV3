import AddParentSerie from './AddParentSerie'
import AddTeamToSerie from './AddTeamToSerie'
import EditParentSerie from './EditParentSerie'
import EditSerie from './EditSerie'
import EditTeamSerie from './EditTeamserie'

const EditSerieForms = () => {
  return (
    <div className="flex flex-col gap-4">
      <EditSerie />
      <AddParentSerie />
      <EditParentSerie />
      <div className="grid grid-cols-2 gap-8">
        <AddTeamToSerie />
        <EditTeamSerie />
      </div>
    </div>
  )
}

export default EditSerieForms
