// import { Button } from '@/components/base/ui/button'
// import type { CheckedState } from '@/components/base/ui/checkbox'
// import CheckboxBadge from '@/components/Common/CheckboxBadge'
// import { getRouteApi } from '@tanstack/react-router'

// const route = getRouteApi(
//   '/_layout/seasons/$year/$group/games',
// )

// type TeamPreferenceProps = {
//   teamArray: Array<{ teamId: number; casualName: string }>
// }

// const TeamPreference = ({
//   teamArray,
// }: TeamPreferenceProps) => {
//   const teams = route.useSearch({ select: (s) => s.teams })
//   const navigate = route.useNavigate()

//   const handleTeamArrayChange = (
//     checked: CheckedState,
//     teamId: number,
//   ) => {
//     if (checked) {
//       navigate({
//         resetScroll: false,
//         search: (prev) => {
//           if (prev.teams) {
//             return {
//               ...prev,
//               teams: [...prev.teams, teamId],
//             }
//           } else {
//             return {
//               ...prev,
//               teams: [teamId],
//             }
//           }
//         },
//       })
//     } else {
//       navigate({
//         resetScroll: false,
//         search: (prev) => {
//           if (prev.teams && prev.teams.includes(teamId)) {
//             if (prev.teams.length === 1)
//               return { ...prev, teams: undefined }
//             return {
//               ...prev,
//               teams: [
//                 ...prev.teams.filter((t) => t !== teamId),
//               ],
//             }
//           } else return { ...prev }
//         },
//       })
//     }
//   }

//   const emptyTeamSelection = () => {
//     navigate({
//       resetScroll: false,
//       search: (prev) => {
//         return {
//           ...prev,
//           teams: undefined,
//         }
//       },
//     })
//   }

//   return (
//     <div className="mt-1 px-4">
//       <div className="flex flex-col gap-y-0.5">
//         <span className="font-semibold text-[10] xs:text-xs md:text-sm">
//           Välj lag
//         </span>
//       </div>
//       <div className="msm:grid-cols-2 msm:gap-4 grid grid-cols-1 items-center gap-2 md:grid-cols-4 md:gap-6 xl:grid-cols-6">
//         {teamArray.map((t) => {
//           return (
//             <CheckboxBadge
//               key={t.teamId.toString()}
//               name="teams"
//               id={t.teamId.toString()}
//               checked={
//                 teams ? teams.includes(t.teamId) : false
//               }
//               onCheckedChange={(checked) =>
//                 handleTeamArrayChange(checked, t.teamId)
//               }
//               title={t.casualName}
//               orientation="horizontal"
//               className="dark:bg-muted bg-card"
//             />
//           )
//         })}
//         <Button
//           onClick={emptyTeamSelection}
//           className="h-full"
//         >
//           Ta bort val
//         </Button>
//       </div>
//     </div>
//   )
// }

// export default TeamPreference
