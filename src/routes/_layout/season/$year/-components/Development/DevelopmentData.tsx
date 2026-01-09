import DevelopmentClicker from './DevelopmentClicker'
import DevelopmentGamesList from './DevelopmentGamesList'
import DevelopmentTable from './DevelopmentTable'

const DevelopmentData = () => {
  return (
    <div className="font-inter text-foreground mx-auto flex w-full flex-col pt-2">
      <div>
        <DevelopmentClicker />

        <div className="grid grid-cols-1 gap-2 lg:grid-cols-7 lg:gap-4">
          <div className="lg:col-span-3">
            <DevelopmentGamesList />
          </div>
          <div className="lg:col-span-4">
            <DevelopmentTable />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DevelopmentData
