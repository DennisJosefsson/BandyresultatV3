const DataCard = ({
  label,
  data,
}: {
  label: string
  data: string | number | undefined | null
}) => {
  return (
    <div className="bg-muted-foreground/20 mb-1 flex w-full flex-col px-1 @sm:px-3 py-1">
      <div className="flex flex-row justify-between text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm/6">
        <span>{label}</span>
        <span className="text-right">{data}</span>
      </div>
    </div>
  )
}
export default DataCard
