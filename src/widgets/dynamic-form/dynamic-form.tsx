import React, { Fragment, useMemo } from 'react'
import { DynamicFormProps } from './types.ts'
import { Button } from '@mui/material'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { Schema } from '@entities'
import { EnumField, StringField } from './components'

export const DynamicForm: React.FC<DynamicFormProps> = ({ schema, onSubmit }) => {
  const form = useForm<FieldValues>()

  const rootRequired = useMemo(() => {
    if ('required' in schema) {
      return new Set(schema.required)
    }
  }, [schema])

  function renderFields(schema: Schema, key: string, required?: Set<string>): React.ReactElement {
    if ('enum' in schema) {
      const isRequired = required?.has(key)

      return <EnumField fieldName={key} schema={schema} required={isRequired} />
    }

    if (schema.type === 'string') {
      const isRequired = required?.has(key)
      return <StringField fieldName={key} schema={schema} required={isRequired} />
    }

    if (schema.type === 'object' && schema.properties) {
      return <>
        {Object.keys(schema.properties).map((key) => <Fragment
          key={key}>{renderFields(schema.properties[key], key, new Set(schema.required))}</Fragment>)}
      </>
    }

    return <></>
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {renderFields(schema, 'root', rootRequired)}
        <Button type="submit">Отправить</Button>
      </form>
    </FormProvider>
  )
}