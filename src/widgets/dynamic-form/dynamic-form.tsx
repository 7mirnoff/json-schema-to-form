import React, { useMemo } from 'react'
import { DynamicFormProps } from './types.ts'
import { Button, Toolbar } from '@mui/material'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { SchemaField } from './components'

export const DynamicForm: React.FC<DynamicFormProps> = ({ schema, onSubmit }) => {
  const form = useForm<FieldValues>()

  const rootRequired = useMemo(() => {
    if ('required' in schema) {
      return new Set(schema.required)
    }
  }, [schema])

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <SchemaField schema={schema} path='' required={rootRequired} />
        <Toolbar sx={{ justifyContent: "center" }}>
          <Button type="submit" variant="contained">Отправить</Button>
        </Toolbar>
      </form>
    </FormProvider>
  )
}