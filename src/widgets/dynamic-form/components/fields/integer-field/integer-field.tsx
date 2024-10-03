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
          onChange={(evt) => {
            const { value } = evt.target

            const validInput = /^-?\d*$/
            if (validInput.test(value) || value === '') {
              const parsedInt = value === '' ? undefined : parseInt(value, 10)
              field.onChange(parsedInt)
            }
          }}
          error={fieldState.invalid}
          helperText={fieldState.error?.message}
        />
      )}
    />
  )
}
