import type { ReactNode } from 'react'

export function TeamnameHeader({ children }: { children: ReactNode }) {
  return (
    <div className="xs:pl-5 xs:text-[8px] xs:w-18 msm:w-24 w-10 truncate pl-1 text-left text-[7px] sm:pl-7 sm:text-[10px] md:pl-8 md:text-sm lg:w-fit xl:text-base">
      {children}
    </div>
  )
}

export function TeamnameLabel({ children }: { children: ReactNode }) {
  return (
    <div className="xs:text-[8px] xs:w-18 msm:w-24 xxs:leading-3 xs:leading-4 flex w-10 flex-row items-center gap-1 truncate text-left text-[7px] leading-2 sm:gap-2 sm:text-[10px] sm:leading-5 md:text-sm lg:w-fit lg:leading-6 xl:text-base">
      {children}
    </div>
  )
}
