import type { Schema } from '@entities'

export interface FieldSchemaProps {
  schema: Schema,
  path: string,
  title?: string
  required?: Set<string>
}