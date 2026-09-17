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
  logoId: number | null
  hasDark: boolean | null
}

const img_cdn = clientEnv.VITE_IMG_CDN

type ImgUrl =
  | `${string}/${LogoSize}/${number}_${LogoSize}x${LogoSize}.png`
  | `${string}/${LogoSize}/${number}_dark_${LogoSize}x${LogoSize}.png`
  | `${string}/${number}/default_${number}x${number}.png`

const TeamLogo = ({
  logoId,
  size,
  hasDark,
  ...props
}: TeamLogoProps) => {
  const { theme } = useTheme()

  const fallbackUrl: ImgUrl = `${img_cdn}/${size}/default_${size}x${size}.png`
  const imgUrl: ImgUrl = logoId
    ? theme === 'dark' && hasDark
      ? `${img_cdn}/${size}/${logoId}_dark_${size}x${size}.png`
      : `${img_cdn}/${size}/${logoId}_${size}x${size}.png`
    : fallbackUrl
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
