import { FieldValues, SubmitHandler } from 'react-hook-form'
export { type SubmitHandler, type FieldValues }


export interface DynamicFormProps {
  schema: any
  onSubmit: SubmitHandler<FieldValues>
}