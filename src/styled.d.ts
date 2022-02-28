// import original module declarations
import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string
    }
    border: {
      source: string
      size: string
    }
  }
}
