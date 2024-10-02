import React from 'react'
import { FieldBooleanProps } from './types.ts'
import { Controller, useFormContext } from 'react-hook-form'
import { Checkbox, FormControlLabel } from '@mui/material'

export const BooleanField: React.FC<FieldBooleanProps> = ({ schema, fieldName }) => {
  const form = useFormContext()

  return (
    <Controller
      control={form.control}
      defaultValue={false}
      name={fieldName}
      render={({ field }) => (
        <FormControlLabel
          value="top"
          control={
            <Checkbox
              color="primary"
              checked={field.value}
              onChange={(_, checked) => {
                field.onChange(checked)
              }}
            />
          }
          label={schema.title ?? fieldName}
        />
      )}
    />
  )
}