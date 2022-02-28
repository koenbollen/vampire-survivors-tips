import React, { ReactElement } from 'react'
import styled from 'styled-components'

import { ItemData } from '../types'
import Item from './Item'

// @ts-expect-error
import combine from 'data-url:../assets/weaponLevelFull.png'
// @ts-expect-error
import equals from 'data-url:../assets/pause.png'

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: .2rem;
`

const CombineSymbol = styled.div`
  content: '';
  width: .8rem;
  height: .8rem;
  background: url(${combine}) center/cover no-repeat;
  image-rendering: pixelated;
`

const EqualsSymbol = styled.div`
  content: '';
  width: .8rem;
  height: .8rem;
  background: url(${equals}) center/cover no-repeat;
  image-rendering: pixelated;
  transform: rotate(90deg);
`

interface TripletProps {
  weapon: ItemData
  powerup: ItemData
  result: ItemData
}

export default (props: TripletProps): ReactElement => {
  const { weapon, powerup, result } = props
  return (
    <Container>
      <Item data={weapon} />
      <CombineSymbol />
      <Item data={powerup} />
      <EqualsSymbol />
      <Item data={result} />
    </Container>
  )
}
