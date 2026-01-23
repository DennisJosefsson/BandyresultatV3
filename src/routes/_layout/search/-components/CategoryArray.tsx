import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox, CheckedState } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Categories } from '@/lib/types/search'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'
import { categoryArrayValues } from './arrays/arrays'

const initCategories = [
  'playoffseries',
  'qualification',
  'regular',
  'eight',
  'quarter',
  'semi',
  'final',
] satisfies Categories[]

const CategoryArray = () => {
  const categoryArray = useSearch({
    from: '/_layout/search',
    select: (search) => search.categoryArray,
  })
  const [selectedCategories, setSelectedCategories] = useState<Categories[]>(
    categoryArray ?? initCategories,
  )

  const navigate = useNavigate({ from: '/search' })

  useEffect(() => {
    navigate({
      search: (prev) => ({ ...prev, categoryArray: selectedCategories }),
    })
  }, [selectedCategories, navigate])

  const onCheckedChange = useCallback(
    (checked: CheckedState, category: Categories) => {
      if (checked) {
        setSelectedCategories((prev) => [...prev, category])

        navigate({
          search: (prev) => {
            if (prev.categoryArray) {
              return {
                ...prev,
                categoryArray: [...prev.categoryArray, category],
              }
            } else {
              return { ...prev, categoryArray: initCategories }
            }
          },
        })
      } else {
        setSelectedCategories((prev) => prev.filter((cat) => cat !== category))
        navigate({
          search: (prev) => {
            if (prev.categoryArray && prev.categoryArray.includes(category)) {
              return {
                ...prev,
                categoryArray: [
                  ...prev.categoryArray.filter((cat) => cat !== category),
                ],
              }
            } else {
              return {
                ...prev,
                categoryArray: initCategories.filter((cat) => cat !== category),
              }
            }
          },
        })
      }
    },
    [navigate],
  )
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Matchkategorier</CardTitle>
          <CardDescription>Välj minst en kategori.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-y-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-12">
            {categoryArrayValues.map((cat) => {
              return (
                <div
                  className="flex flex-row items-center justify-between"
                  key={cat.category}
                >
                  <Label htmlFor={cat.category}>{cat.name}</Label>
                  <Checkbox
                    name="categoryArray"
                    id={cat.category}
                    checked={selectedCategories.includes(cat.category)}
                    onCheckedChange={(checked) =>
                      onCheckedChange(checked, cat.category)
                    }
                  />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CategoryArray
