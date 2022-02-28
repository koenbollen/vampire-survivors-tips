import React, { ReactElement } from 'react'

import styled from 'styled-components'

// @ts-expect-error
import imageURLs from 'data-url:../assets/items/*.png'
// @ts-expect-error
import frame from 'data-url:../assets/frameB.png'
// @ts-expect-error
import select from 'data-url:../assets/selectionSquareActive_01.png'

interface ItemData {
  readonly key: string
  readonly name: string
  readonly description: string
  readonly frameName: string
}

interface ItemProps {
  readonly data: ItemData
  readonly supressHover?: boolean
}

const Container = styled.div`
  position: relative;
  width: 4rem;
  height: 4rem;
  margin: 2px;
  padding: .7rem;
  background: url(${frame}) center/cover no-repeat;
  image-rendering: pixelated;
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

export const Item = ({ data }: ItemProps): ReactElement => {
  const imageURL = imageURLs[data.frameName.slice(0, -4)]
  return (
    <Container title={data.description}>
      <Image src={imageURL} alt={`${data.name} icon`} />
    </Container>
  )
}
