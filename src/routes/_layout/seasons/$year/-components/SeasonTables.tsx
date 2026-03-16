import MobileTableList from './Tables/MobileTableList'
import SeasonTablesButtonList from './Tables/SeasonTablesButtonList'
import TableList from './Tables/TableList'

const SeasonTables = () => {
  return (
    <div>
      <SeasonTablesButtonList />
      <div className="hidden sm:block">
        <TableList />
      </div>
      <div className="sm:hidden">
        <MobileTableList />
      </div>
    </div>
  )
}

export default SeasonTables
