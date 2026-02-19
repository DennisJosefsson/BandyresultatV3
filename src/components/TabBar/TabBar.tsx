import { ReactNode } from 'react'

export type TabBarObject = {
  help?: ReactNode

  tabBarArray: {
    tab: ReactNode
    tabName: string
    conditional?: string | boolean
  }[]
}

export const TabBarInline = ({
  tabBarObject,
}: {
  tabBarObject: TabBarObject
}) => {
  return (
    <div>
      <div className="xs:mb-2 flex flex-row items-center justify-between gap-1 md:gap-2">
        {tabBarObject.tabBarArray.map((currTab) => {
          return <div key={currTab.tabName}>{currTab.tab}</div>
        })}
        {tabBarObject.help ? tabBarObject.help : null}
      </div>
    </div>
  )
}

export const TabBarDivided = ({
  tabBarObject,
}: {
  tabBarObject: TabBarObject
}) => {
  return (
    <div>
      <div className="xs:mb-2 flex flex-row items-center justify-between gap-1 md:gap-2 md:text-lg">
        <div className="flex flex-row gap-1 md:gap-2">
          {tabBarObject.tabBarArray.map((currTab) => {
            return <div key={currTab.tabName}>{currTab.tab}</div>
          })}
        </div>
        <div className="flex flex-row gap-1 md:gap-2">
          {tabBarObject.help ? tabBarObject.help : null}
        </div>
      </div>
    </div>
  )
}
