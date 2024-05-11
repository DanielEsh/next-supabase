export interface NodeItem<
  KEY extends string | number = string | number,
  DATA = unknown,
> {
  label: string
  key: KEY
  type?: 'group' | 'ignored'
  data?: DATA
  leaf?: boolean
  children?: NodeItem<KEY, DATA>[]
}
