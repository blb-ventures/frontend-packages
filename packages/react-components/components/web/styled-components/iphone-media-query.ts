import { css, DefaultTheme, FlattenInterpolation, ThemeProps } from 'styled-components';

export const iPhoneMediaQuery = (styles: FlattenInterpolation<ThemeProps<DefaultTheme>>) => css`
  // iPhone 12 and 12 Pro
  @media only screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) {
    ${styles}
  }
  // iPhone 12 Pro Max
  @media only screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) {
    ${styles}
  }
  // iPhone 12 Mini
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    ${styles}
  }
  // iPhone 11
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
    ${styles}
  }
  // iPhone 11 Pro
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    ${styles}
  }
  // iPhone 11 Pro Max
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    ${styles}
  }
`;