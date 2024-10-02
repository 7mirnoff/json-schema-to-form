import type { FieldBaseProps } from '../types.ts'
import type { ArraySchema } from '@entities'

export interface FieldArrayProps extends FieldBaseProps {
  schema: ArraySchema
}