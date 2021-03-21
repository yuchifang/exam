import { css } from 'styled-components'

const size = {
    mobile: 500,
    mobileM: 720,
    desktopS: 980,
    desktopM: 1200,
    desktopL: 1440,
}

const MediaCSS = (size: number) => (...args: any[]) => css`
    @media screen and (min-width:${size}px){
        ${(css as any)(...args)}
    }
`

export const MediaQueries = {
    MobileSCSS: MediaCSS(size.mobile),
    MobileMCSS: MediaCSS(size.mobileM),
    MobileLCSS: MediaCSS(size.desktopS),
    DesktopMCSS: MediaCSS(size.desktopM),
    DesktopLCSS: MediaCSS(size.desktopL),
}