import React, { ReactElement } from 'react'

import styled from 'styled-components'

import { ItemData } from '../types'

// @ts-expect-error
import imageURLs from 'data-url:../assets/items/*.png'
// @ts-expect-error
import frame from 'data-url:../assets/frameB.png'
// @ts-expect-error
import select from 'data-url:../assets/selectionSquareActive_01.png'

const Container = styled.div`
  position: relative;
  width: 4rem;
  height: 4rem;
  margin: 2px;
  padding: .7rem;
  image-rendering: pixelated;
  border-image: url(${frame}) ${props => props.theme.border.source} fill / ${props => props.theme.border.size} repeat;

  user-select: none;

  &:hover::before {
    content: '';
    position: absolute;
    width: 130%;
    height: 130%;
    top: -15%;
    left: -15%;
    background: url(${select}) center/cover no-repeat;
  }
`

const Image = styled.img`
  image-rendering: pixelated;
  width: 100%;
  height: 100%;
`

interface ItemProps {
  readonly data: ItemData
  readonly supressHover?: boolean
}

export default ({ data }: ItemProps): ReactElement => {
  const imageURL = imageURLs[data.frameName.slice(0, -4)]
  return (
    <Container title={data.name}>
      <Image src={imageURL} alt={`${data.name} icon`} />
    </Container>
  )
}
