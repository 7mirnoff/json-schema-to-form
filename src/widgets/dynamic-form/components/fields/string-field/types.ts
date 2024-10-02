import { type FieldBaseProps } from '../types'
import { type StringSchema } from '@entities'

export interface FieldStringProps extends FieldBaseProps {
  schema: StringSchema
}