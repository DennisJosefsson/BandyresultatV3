import { useTheme } from '@/lib/contexts/themeContext'
import { clientEnv } from '@/lib/env/clientEnv'
import { cn } from '@/lib/utils/utils'
import type {
  DetailedHTMLProps,
  ObjectHTMLAttributes,
} from 'react'

type LogoSize = 32 | 64 | 128 | 256

interface TeamLogoProps extends DetailedHTMLProps<
  ObjectHTMLAttributes<HTMLObjectElement>,
  HTMLObjectElement
> {
  size: LogoSize
  teamId: number
}

const img_cdn = clientEnv.VITE_IMG_CDN

type ImgUrl =
  | `${string}/${LogoSize}/${number}_${LogoSize}x${LogoSize}.png`
  | `${string}/${LogoSize}/${number}_dark_${LogoSize}x${LogoSize}.png`

const darkLogoArray: Array<number> = [8, 95, 136]

const TeamLogo = ({
  teamId,
  size,
  ...props
}: TeamLogoProps) => {
  const { theme } = useTheme()

  const fallbackUrl = `${img_cdn}/${size}/default_${size}x${size}.png`
  const imgUrl: ImgUrl =
    theme === 'dark' && darkLogoArray.includes(teamId)
      ? `${img_cdn}/${size}/${teamId}_dark_${size}x${size}.png`
      : `${img_cdn}/${size}/${teamId}_${size}x${size}.png`
  return (
    <object
      data={imgUrl}
      type="image/png"
      className={cn(
        'size-[1lh] object-scale-down',
        props.className,
      )}
      {...props}
    >
      <img
        title={props.title ? props.title : 'Default logo'}
        alt={props.title ? props.title : 'Default logo'}
        className={cn(
          'size-[1lh] object-scale-down',
          props.className,
        )}
        src={fallbackUrl}
      />
    </object>
  )
}

export default TeamLogo
