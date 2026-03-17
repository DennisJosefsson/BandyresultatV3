import DevelopmentClicker from './DevelopmentClicker'
import DevelopmentGamesList from './DevelopmentGamesList'
import DevelopmentTable from './DevelopmentTable'
import MobileDevelopmentTable from './MobileDevelopmentTable'

const DevelopmentData = () => {
  return (
    <div className="font-inter text-foreground mx-auto flex w-full flex-col pt-2">
      <div>
        <DevelopmentClicker />

        <div className="grid grid-cols-1 gap-2 xl:grid-cols-7 xl:gap-4">
          <div className="xl:col-span-3">
            <DevelopmentGamesList />
          </div>
          <div className="hidden sm:block xl:col-span-4">
            <DevelopmentTable />
          </div>
          <div className="sm:hidden">
            <MobileDevelopmentTable />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DevelopmentData
