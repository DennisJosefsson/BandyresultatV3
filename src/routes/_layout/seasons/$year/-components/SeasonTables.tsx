import TableList from './Tables/TableList'
import SeasonTablesButtonList from './Tables/SeasonTablesButtonList'
import MobileTableList from './Tables/MobileTableList'

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
