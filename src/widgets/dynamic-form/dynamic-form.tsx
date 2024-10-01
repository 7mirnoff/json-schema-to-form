import React from 'react'
import { DynamicFormProps } from './types.ts'
import { Button } from '@mui/material'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { Field } from './components'

export const DynamicForm: React.FC<DynamicFormProps> = ({ schema, onSubmit }) => {
  console.log(schema)
  const form = useForm<FieldValues>()

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Field />
        <Button type="submit">Отправить</Button>
      </form>
    </FormProvider>
  )
}