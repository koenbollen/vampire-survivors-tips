import React, { ReactElement, useRef } from 'react'
import styled from 'styled-components'

import { ItemData } from '../types'
import Evolve from './Evolve'
import PopoutButton from './PopoutButton'

// @ts-expect-error
import frame from 'data-url:../assets/frame1_c2.png'
// @ts-expect-error
import box from 'data-url:../assets/BoxOpen.png'

const Container = styled.div`
  position: relative;
  display: inline-flex;
  flex-flow: row wrap;
  padding: 2rem;
  min-width: 1140px;

  border-image: url(${frame}) ${props => props.theme.border.source} fill / ${props => props.theme.border.size} repeat;
  image-rendering: pixelated;
`

const Sidebar = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: .2rem;
`

const Box = styled.div`
  width: 2rem;
  height: 2rem;
  margin-top: -0.2rem;
  margin-right: 0.5rem;
  background: url(${box}) center/cover no-repeat;
  image-rendering: pixelated;
`

const Spacer = styled.div`
  content: '';
  width: 1px;
  height: 4rem;
`

const CombineSpacer = styled.div`
  content: '';
  height: .8rem;
`

interface EvolvesWindowProps {
  items: ItemData[]
}

export default ({ items }: EvolvesWindowProps): ReactElement => {
  const itemLookup = items.reduce<{ [key: string]: typeof items[0] }>((m, i) => {
    m[i.key] = i
    return m
  }, {})

  const evolves = items.filter(t => t.from !== undefined).map(t => {
    if ((t.from == null) || t.from?.length < 2) {
      return undefined
    } else {
      return [
        t,
        ...t.from.map(i => itemLookup[i])
      ]
    }
  }).filter(t => t) as ItemData[][]
  evolves.sort((a, b) => {
    const i = 2
    if (a[i].name < b[i].name) {
      return -1
    } else if (a[i].name > b[i].name) {
      return 1
    }
    return 0
  })

  console.log(evolves)

  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <Container ref={containerRef}>
      <Sidebar>
        <Spacer />
        <CombineSpacer />
        <Spacer />
        <Box />
        <PopoutButton target={containerRef} />
      </Sidebar>
      {evolves.map(t => <Evolve key={t[0].key} result={t[0]} parts={t.slice(1)} />)}
    </Container>
  )
}
