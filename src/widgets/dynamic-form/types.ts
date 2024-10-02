import { FieldValues, SubmitHandler } from 'react-hook-form'
import { Schema } from '@entities'
export { type SubmitHandler, type FieldValues }

export interface DynamicFormProps {
  schema: Schema
  onSubmit: SubmitHandler<FieldValues>
}