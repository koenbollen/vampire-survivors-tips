import React, { ReactElement } from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'

import { theme } from './theme'
import { ItemData } from './types'
import EvolvesWindow from './Components/EvolvesWindow'

import data from './data.json'

const GlobalStyle = createGlobalStyle`
  html, body, #app {
    background: ${props => props.theme.colors.background};
    box-sizing: border-box;
    height: 100%;
  }
  *, *:before, *:after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
    font-size: 1em;
    font-family: inherit;
  }
  img {
    max-width: 100%;
    height: auto;
  }
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: .5rem;
`

export const App = (): ReactElement => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <EvolvesWindow items={data.items as ItemData[]} />
      </Container>
    </ThemeProvider>
  )
}
