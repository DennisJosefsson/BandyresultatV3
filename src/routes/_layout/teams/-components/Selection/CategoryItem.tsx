import { Checkbox, CheckedState } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

type Category = {
  name: string
  category: string
}

type CategoryItemProps = {
  category: Category
  selectedCategories: string[]
  onCheckedChange: (checked: CheckedState, category: string) => void
}

const CategoryItem = ({
  category,
  selectedCategories,
  onCheckedChange,
}: CategoryItemProps) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <Label htmlFor={category.category}>{category.name}</Label>
      <Checkbox
        name="categoryArray"
        id={category.category}
        checked={selectedCategories.includes(category.category)}
        onCheckedChange={(checked) =>
          onCheckedChange(checked, category.category)
        }
      />
    </div>
  )
}

export default CategoryItem
