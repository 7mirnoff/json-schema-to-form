import React from 'react'
import { TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { FieldStringProps } from './types.ts'

export const StringField: React.FC<FieldStringProps> = ({ schema, fieldName, title, required }) => {
  const form = useFormContext()

  return (
    <Controller
      name={fieldName}
      defaultValue={null}
      control={form.control}
      rules={{
        required: { value: Boolean(required), message: 'Обязательное поле' },
        minLength: schema.minLength && { value: schema.minLength, message: `Минимум ${schema.minLength} символов` },
        maxLength: schema.maxLength && { value: schema.maxLength, message: `Максимум ${schema.maxLength} символов` },
      }}
      render={({ field, fieldState }) => (
        <TextField
          fullWidth
          margin="dense"
          size="small"
          label={title}
          required={required}
          {...field}
          value={field.value ?? ''}
          error={fieldState.invalid}
          helperText={fieldState.error?.message}
        />
      )}
    />
  )
}
