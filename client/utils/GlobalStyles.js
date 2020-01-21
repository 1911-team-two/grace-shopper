import {createGlobalStyle} from 'styled-components'
import styledNormalize from 'styled-normalize'
// import WorkSansRegular from '../assets/WorkSans-Regular.ttf'
// import './google-fonts.css'

export const GlobalStyles = createGlobalStyle`
  ${styledNormalize}

  body {
    background-color: #FEF7F5;
    font-family:'Work Sans';
    color: #39337B;
  }

  a, a:visited {
    color: #39337B
  }
`
