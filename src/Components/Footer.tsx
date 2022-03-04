import React, { ReactElement } from 'react'
import styled from 'styled-components'

const Footer = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 1rem;
  a {
    color: black;
  }
  img {
    height: 1em;
    padding: 0 .2em;
    vertical-align:middle;
  }
`

export default (): ReactElement => {
  const github = new URL('../assets/github.svg', import.meta.url)
  return (
    <Footer>
      <div>Assets are shamefully ripped from the game itself: <a href='https://poncle.itch.io/vampire-survivors' target='_blank' rel='noreferrer'>Play it here</a> (or <a href='https://store.steampowered.com/app/1794680/Vampire_Survivors/' target='_blank' rel='noreferrer'>download here</a>)</div>
      <div>
        Checkout the source or report issues on <a href='https://github.com/koenbollen/vampire-survivors-tips' target='_blank' rel='noreferrer'>Github</a><img src={github.toString()} alt='Github logo' />
      </div>
    </Footer>
  )
}
