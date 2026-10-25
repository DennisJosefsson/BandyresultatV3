const DataCard = ({
  label,
  count,
  boldedLabel,
}: {
  label: string
  count: number | string | null
  boldedLabel: boolean
}) => {
  return (
    <div className="flex flex-row justify-between text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm/6">
      <span
        data-bolded={boldedLabel}
        className="data-[bolded=true]:font-semibold"
      >
        {label}
      </span>
      <span
        data-bolded={boldedLabel}
        className="data-[bolded=true]:font-semibold text-right"
      >
        {count ?? 0}
      </span>
    </div>
  )
}
export default DataCard
