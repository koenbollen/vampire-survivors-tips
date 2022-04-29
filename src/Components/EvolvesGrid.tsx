import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { ItemData } from '../types'

interface EvolveProps {
  evolves: ItemData[][]
}

const Container = styled.div`
  display: inline-grid;
  align-items: center;
  gap: .2rem;
`

export default ({ evolves }: EvolveProps): ReactElement => {
  return (
    <Container />
  )
}
