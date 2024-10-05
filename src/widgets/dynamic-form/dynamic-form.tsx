import React, { useMemo } from 'react'
import { DynamicFormProps } from './types.ts'
import { Button, Toolbar } from '@mui/material'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { SchemaField } from './components'

export const DynamicForm: React.FC<DynamicFormProps> = ({ schema, onSubmit }) => {
  const form = useForm<FieldValues>()

  const rootRequired = useMemo(() => {
    if ('required' in schema && Array.isArray(schema.required)) {
      return new Set(schema.required)
    }
  }, [schema])

  function onFormError() {
    const firstErrorField = Object.keys(form.formState.errors)[0]
    if (firstErrorField) {
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`)
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onFormError)} noValidate>
        <SchemaField schema={schema} path="" title="dynamicForm" required={rootRequired} />
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Button type="submit" variant="contained">Отправить</Button>
        </Toolbar>
      </form>
    </FormProvider>
  )
}