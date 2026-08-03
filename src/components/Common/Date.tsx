export function Datum({
  children,
  className,
}: {
  children: string | number | undefined | null
  className?: string | undefined
}) {
  if (!children) {
    return <span>Saknar speldatum</span>
  }

  const date = new Date(children)
  const datum = new Intl.DateTimeFormat('sv-SE', {
    dateStyle: 'long',
  }).format(date)

  return <span className={className}>{datum}</span>
}
