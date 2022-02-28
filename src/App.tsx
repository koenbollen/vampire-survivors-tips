import React, { ReactElement } from 'react'

import data from './data.json'
import { Item } from './Components/Item'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { theme } from './theme'

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
  flex-wrap: wrap;
  align-content: flex-start;
  gap: .1rem;
`

export const App = (): ReactElement => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        {data.items.map(i => <Item key={i.key} data={i} />)}
      </Container>
    </ThemeProvider>
  )
}
