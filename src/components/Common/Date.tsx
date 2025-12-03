import dayjs from 'dayjs'
import 'dayjs/locale/sv'
dayjs.locale('sv')

const Date = ({
  children,
  className,
}: {
  children: string | number | undefined | null
  className?: string | undefined
}) => {
  if (!children) {
    return <span>Saknar speldatum</span>
  }

  return (
    <span className={className}>
      {dayjs(children).format('D MMMM YYYY')}
    </span>
  )
}

export default Date
