import DevelopmentClicker from './DevelopmentClicker'
import DevelopmentGamesList from './DevelopmentGamesList'
import DevelopmentTable from './DevelopmentTable'
import MobileDevelopmentTable from './MobileDevelopmentTable'

const DevelopmentData = () => {
  return (
    <div className="@container/dev font-inter text-foreground mx-auto flex w-full flex-col pt-2">
      <div>
        <DevelopmentClicker />

        <div className="grid grid-cols-1 gap-2 @5xl/dev:grid-cols-7 @5xl/dev:gap-4">
          <div className="@5xl/dev:col-span-3">
            <DevelopmentGamesList />
          </div>
          <div className="hidden @md/dev:block @5xl/dev:col-span-4 @5xl/dev:mt-6">
            <DevelopmentTable />
          </div>
          <div className="@md/dev:hidden">
            <MobileDevelopmentTable />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DevelopmentData
