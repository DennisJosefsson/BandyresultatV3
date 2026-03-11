import {
  useNavigate,
  useSearch,
} from '@tanstack/react-router'

import type { CheckedState } from '@/components/base/ui/checkbox'
import type { Categories } from '@/lib/types/search'

import CheckboxBadge from '@/components/Common/CheckboxBadge'
import { categoryArrayValues } from './arrays/arrays'

const initCategories = [
  'playoffseries',
  'qualification',
  'regular',
  'eight',
  'quarter',
  'semi',
  'final',
] satisfies Array<Categories>

const CategoryArray = () => {
  const categoryArray = useSearch({
    from: '/_layout/search',
    select: (search) => search.categoryArray,
  })

  const navigate = useNavigate({ from: '/search' })

  const onCheckedChange = (
    checked: CheckedState,
    category: Categories,
  ) => {
    if (checked) {
      navigate({
        search: (prev) => {
          if (prev.categoryArray) {
            return {
              ...prev,
              categoryArray: [
                ...prev.categoryArray,
                category,
              ],
            }
          } else {
            return {
              ...prev,
              categoryArray: initCategories,
            }
          }
        },
      })
    } else {
      navigate({
        search: (prev) => {
          if (
            prev.categoryArray &&
            prev.categoryArray.includes(category)
          ) {
            return {
              ...prev,
              categoryArray: [
                ...prev.categoryArray.filter(
                  (cat) => cat !== category,
                ),
              ],
            }
          } else {
            return {
              ...prev,
              categoryArray: initCategories.filter(
                (cat) => cat !== category,
              ),
            }
          }
        },
      })
    }
  }
  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 mb-2">
          <h4 className="text-sm">Matchkategorier</h4>
          <h6 className="text-[10px[">
            Välj minst en kategori.
          </h6>
        </div>
        <div>
          <div className="grid grid-cols-1 gap-y-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-12">
            {categoryArrayValues.map((cat) => {
              return (
                <CheckboxBadge
                  key={cat.category}
                  name="categoryArray"
                  id={cat.category}
                  checked={
                    categoryArray
                      ? categoryArray.includes(cat.category)
                      : initCategories.includes(
                          cat.category,
                        )
                  }
                  onCheckedChange={(checked) =>
                    onCheckedChange(checked, cat.category)
                  }
                  title={cat.name}
                  orientation="horizontal"
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryArray
