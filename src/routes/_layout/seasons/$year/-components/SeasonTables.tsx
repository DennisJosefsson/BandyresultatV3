import MobileTableList from './Tables/MobileTableList'
import SeasonTablesButtonList from './Tables/SeasonTablesButtonList'
import TableList from './Tables/TableList'

const SeasonTables = () => {
  return (
    <div className="@container/tables">
      <SeasonTablesButtonList />
      <div className="hidden @md/tables:block">
        <TableList />
      </div>
      <div className="@md/tables:hidden">
        <MobileTableList />
      </div>
    </div>
  )
}

export default SeasonTables
