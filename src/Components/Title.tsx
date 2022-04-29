import React, { ReactElement, useEffect, useRef } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`

const Text = styled.canvas`
  image-rendering: pixelated;
`

interface TitleProps {
  text: string
}

export default (props: TitleProps): ReactElement => {
  const { text } = props

  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.font = "16px 'Courier New'"
    ctx.textBaseline = 'top'
    const bounds = ctx.measureText(text)
    canvas.width = Math.ceil(bounds.width) + 4
    canvas.height = 12 + 4
    canvas.style.width = `${canvas.width * 3}px`
    ctx.font = "16px 'Courier New'"
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'white'
    ctx.fillText(text, 2, 2)
  }, [])

  return (
    <Container>
      <Text ref={canvasRef} />
    </Container>
  )
}
