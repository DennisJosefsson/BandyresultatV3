import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/base/ui/card'
import { Skeleton } from '@/components/base/ui/skeleton'
import { cn } from '@/lib/utils/utils'

const SeasonPlayoffSkeleton = () => {
  return (
    <div className="@container/playoff m-0 w-full @2xl/playoff:justify-self-center">
      <div className="grid gap-2 @5xl/playoff:gap-4">
        <div className="grid w-auto min-w-[33%] grid-cols-1 justify-center @2xl/playoff:mx-auto">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-6 mb-2 w-full" />
              <Skeleton className="h-6 w-full" />
            </CardContent>
          </Card>
        </div>

        {[
          { category: 'semi', groups: ['S1', 'S2'] },
          {
            category: 'quarter',
            groups: ['Q1', 'Q2', 'Q3', 'Q4'],
          },
          {
            category: 'eight',
            groups: ['Q1', 'Q2'],
          },
        ].map((cat) => {
          return (
            <div
              key={cat.category}
              data-category={cat.category}
              data-twogroups={
                cat.groups.length === 2 ? true : false
              }
              className={cn(
                'grid grid-cols-1 gap-2',
                'data-[category=semi]:@2xl/playoff:grid-cols-5',
                'data-[category=quarter]:@5xl/playoff:gap-4 data-[category=quarter]:data-[twogroups=true]:@5xl/playoff:gap-4 @2xl/playoff:grid-cols-5',
                'data-[category=quarter]:data-[twogroups=false]:@2xl/playoff:grid-cols-4',
                'data-[category=eight]:@5xl/playoff:gap-4 data-[category=eight]:data-[twogroups=true]:@5xl/playoff:gap-4 @2xl/playoff:grid-cols-5',
                'data-[category=eight]:data-[twogroups=false]:@2xl/playoff:grid-cols-4',
              )}
            >
              {cat.groups.map((group, _, arr) => {
                return (
                  <Card
                    key={group}
                    data-groupid={group}
                    data-twogroups={
                      arr.length === 2 ? true : false
                    }
                    className={cn(
                      'mb-2 @2xl/playoff:mb-6 h-29',
                      'data-[groupid=S1]:@2xl/playoff:col-start-2 data-[groupid=S2]:@2xl/playoff:col-start-4',
                      'data-[twogroups=true]:data-[groupid=Q1]:@2xl/playoff:col-start-2 data-[twogroups=true]:data-[groupid=Q2]:@2xl/playoff:col-start-4',
                      'data-[twogroups=false]:data-[groupid=Q1]:@2xl/playoff:col-start-1 data-[twogroups=false]:data-[groupid=Q2]:@2xl/playoff:col-start-2 data-[twogroups=false]:data-[groupid=Q3]:@2xl/playoff:col-start-3 data-[twogroups=false]:data-[groupid=Q4]:@2xl/playoff:col-start-4',
                      'data-[twogroups=true]:data-[groupid=E1]:@2xl/playoff:col-start-2 data-[twogroups=true]:data-[groupid=E2]:@2xl/playoff:col-start-4',
                      'data-[twogroups=false]:data-[groupid=E1]:@2xl/playoff:col-start-1 data-[twogroups=false]:data-[groupid=E2]:@2xl/playoff:col-start-2 data-[twogroups=false]:data-[groupid=E3]:@2xl/playoff:col-start-3 data-[twogroups=false]:data-[groupid=E4]:@2xl/playoff:col-start-4',
                    )}
                  >
                    <CardContent className="w-full h-full">
                      <Skeleton className="w-full h-full" />
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SeasonPlayoffSkeleton
