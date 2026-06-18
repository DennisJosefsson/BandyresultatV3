import { useTheme } from '@/lib/contexts/themeContext'
import type {
  DetailedHTMLProps,
  ImgHTMLAttributes,
} from 'react'

type LogoSize = 32 | 64 | 128 | 256

interface TeamLogoProps extends DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> {
  size: LogoSize
  teamId: number
}

type ImgUrl =
  | `/logos/teams/${LogoSize}/${number}_${LogoSize}x${LogoSize}.png`
  | `/logos/teams/${LogoSize}/${number}_dark_${LogoSize}x${LogoSize}.png`

const darkLogoArray: Array<number> = [8, 95, 136]

const TeamLogo = ({
  teamId,
  size,
  ...props
}: TeamLogoProps) => {
  const { theme } = useTheme()
  const imgUrl: ImgUrl =
    theme === 'dark' && darkLogoArray.includes(teamId)
      ? `/logos/teams/${size}/${teamId}_dark_${size}x${size}.png`
      : `/logos/teams/${size}/${teamId}_${size}x${size}.png`
  return (
    <img
      {...props}
      src={imgUrl}
    />
  )
}

export default TeamLogo
