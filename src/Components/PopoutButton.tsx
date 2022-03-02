import React, { ReactElement, RefObject, useRef } from 'react'

import styled from 'styled-components'

// @ts-expect-error
import square from 'data-url:../assets/menu_square_flat_24.png'

const Button = styled.button`
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  width: 2rem;
  height: 2rem;
  background: url(${square}) center/cover no-repeat;
  image-rendering: pixelated;
  cursor: pointer;
`

interface PopoutButtonProps {
  readonly target: RefObject<HTMLDivElement>
}

export default ({ target }: PopoutButtonProps): ReactElement => {
  const selfRef = useRef<HTMLButtonElement>(null)

  const click = async (): Promise<void> => {
    if (target.current !== null && selfRef.current !== null) {
      selfRef.current.style.display = 'none'
      const canvas = await render(target.current)
      const stream = canvas.captureStream()
      const vid = document.createElement('video')
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' })
      const frames: BlobPart[] = []
      recorder.ondataavailable = async (e) => {
        frames.push(e.data)
        if (frames.length === 1) {
          recorder.stop()
        }
      }
      recorder.onstop = async () => {
        const superBuffer = new Blob(frames, { type: 'video/webm' })
        vid.src = window.URL.createObjectURL(superBuffer)
        await vid.play()
        await vid.requestPictureInPicture()
        window.URL.revokeObjectURL(vid.src)
        if (selfRef.current !== null) {
          selfRef.current.style.display = 'block'
        }
      }
      recorder.start(10)
    }
  }

  if (document.exitPictureInPicture === undefined) {
    return <></>
  }

  return (
    <Button ref={selfRef} onClick={click} title='pop-out always on top' />
  )
}

async function render (element: HTMLElement): Promise<HTMLCanvasElement> {
  const svg = createForeignObjectSVG(
    element.clientWidth,
    element.clientHeight,
    0,
    0,
    element.cloneNode(true)
  )

  const img = await loadSerializedSVG(svg)
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  ctx.drawImage(img, 0, 0)

  return canvas
}

function createForeignObjectSVG (
  width: number,
  height: number,
  x: number,
  y: number,
  node: Node
): SVGForeignObjectElement {
  const xmlns = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(xmlns, 'svg')

  const defs = document.createElement('defs')
  const style = document.createElement('style')
  const cssRules = document.styleSheets[0].cssRules
  for (let i = 0; i < cssRules.length; i++) {
    style.innerHTML += cssRules[i].cssText
  }
  defs.appendChild(style)
  svg.appendChild(defs)

  const foreignObject = document.createElementNS(xmlns, 'foreignObject')
  svg.setAttributeNS(null, 'width', width.toString())
  svg.setAttributeNS(null, 'height', height.toString())

  foreignObject.setAttributeNS(null, 'width', '100%')
  foreignObject.setAttributeNS(null, 'height', '100%')
  foreignObject.setAttributeNS(null, 'x', x.toString())
  foreignObject.setAttributeNS(null, 'y', y.toString())
  foreignObject.setAttributeNS(null, 'externalResourcesRequired', 'true')
  svg.appendChild(foreignObject)

  foreignObject.appendChild(node)

  return svg
}

async function loadSerializedSVG (svg: Node): Promise<HTMLImageElement> {
  return await new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject

    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(svg))}`
  })
}
