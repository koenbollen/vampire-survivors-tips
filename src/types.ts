
export interface ItemData {
  readonly key: string
  readonly name: string
  readonly description: string
  readonly frameName: string
  readonly type: 'weapon' | 'powerup'
  readonly from?: string[]
}
