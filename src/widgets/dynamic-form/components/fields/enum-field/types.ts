import type { FieldBaseProps } from '../types.ts'
import type { EnumSchema } from '@entities'

export interface FieldEnumProps extends FieldBaseProps {
  schema: EnumSchema
}