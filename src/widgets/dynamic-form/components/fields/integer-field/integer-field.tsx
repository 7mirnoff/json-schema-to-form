import React from 'react'
import { TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { FieldIntegerProps } from './types.ts'

export const IntegerField: React.FC<FieldIntegerProps> = ({ fieldName, title, required }) => {
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
          type="number"
          label={title}
          {...field}
          error={fieldState.invalid}
          helperText={fieldState.error?.message}
        />
      )}
    />
  )
}
