import React from 'react'
import { TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

export const IntegerField: React.FC = () => {
  const form = useFormContext()

  return (
    <Controller
      name="example"
      defaultValue={''}
      control={form.control}
      rules={{
        required: { value: true, message: 'Обязательное поле' },
      }}
      render={({ field, fieldState }) => (
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          type="number"
          {...field}
          error={fieldState.invalid}
          helperText={fieldState.error?.message}
          spellCheck="false"
        />
      )}
    />
  )
}
