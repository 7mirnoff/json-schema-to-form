import type { FieldBaseProps } from '../types'
import { IntegerSchema } from '@entities'

export interface FieldIntegerProps extends FieldBaseProps {
  schema: IntegerSchema
}