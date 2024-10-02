import type { Schema } from '@entities'

export interface FieldSchemaProps {
  schema: Schema,
  path: string,
  required?: Set<string>
}