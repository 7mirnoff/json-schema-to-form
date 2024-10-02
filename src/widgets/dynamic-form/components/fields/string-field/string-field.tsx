import React from 'react'
import { TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { FieldStringProps } from './types.ts'

export const StringField: React.FC<FieldStringProps> = ({ fieldName, schema, required }) => {
  const form = useFormContext()

  return (
    <Controller
      name={fieldName}
      defaultValue={''}
      control={form.control}
      rules={{
        required: { value: Boolean(required), message: 'Обязательное поле' },
      }}
      render={({ field, fieldState }) => (
        <TextField
          fullWidth
          margin="normal"
          label={schema.title ?? fieldName}
          {...field}
          error={fieldState.invalid}
          helperText={fieldState.error?.message}
        />
      )}
    />
  )
}
