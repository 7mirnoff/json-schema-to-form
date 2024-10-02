import type { FieldBaseProps } from '../types'
import { BooleanSchema } from '@entities'

export interface FieldBooleanProps extends FieldBaseProps {
  schema: BooleanSchema
}