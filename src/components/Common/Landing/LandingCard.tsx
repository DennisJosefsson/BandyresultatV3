import type { ReactNode } from 'react'

const LandingCard = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-2 border p-4 shadow-lg xl:gap-8 xl:p-10">{children}</div>
}

function Gender({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row justify-center">
      <h4 className="xs:text-sm text-xs font-bold md:text-base xl:text-lg">{children}</h4>
    </div>
  )
}

function Content({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-3 gap-8">{children}</div>
}

LandingCard.Gender = Gender
LandingCard.Content = Content

export default LandingCard
