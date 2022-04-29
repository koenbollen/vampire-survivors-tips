import React, { ReactElement } from 'react'
import styled from 'styled-components'

import { ItemData } from '../types'
import Item from './Item'

// @ts-expect-error
import equals from 'data-url:../assets/pause.png'

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: .2rem;
`

const PartsContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;

  height: calc(8rem + 8px);
`

const ItemWrapper = styled.div`
  overflow: hidden;

  &:last-child, &:first-child:hover {
    overflow: visible;
  }
`

const EqualsSymbol = styled.div`
  content: '';
  width: .8rem;
  height: .8rem;
  background: url(${equals}) center/cover no-repeat;
  image-rendering: pixelated;
  transform: rotate(90deg);
`

interface EvolveProps {
  parts: ItemData[]
  result: ItemData
}

export default (props: EvolveProps): ReactElement => {
  const { parts, result } = props
  return (
    <Container>
      <PartsContainer>
        {parts.map((part, i) => (
          <ItemWrapper key={part.key}>
            <Item data={part} />
          </ItemWrapper>
        ))}
      </PartsContainer>
      <EqualsSymbol />
      <Item data={result} />
    </Container>
  )
}
