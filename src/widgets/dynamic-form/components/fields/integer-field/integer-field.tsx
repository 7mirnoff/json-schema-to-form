import React from 'react'
import { TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { FieldIntegerProps } from './types.ts'

export const IntegerField: React.FC<FieldIntegerProps> = ({ schema, fieldName, title, required }) => {
  const form = useFormContext()

  return (
    <Controller
      name={fieldName}
      defaultValue={null}
      control={form.control}
      rules={{
        required: { value: Boolean(required), message: 'Обязательное поле' },
        min: schema.minimum && { value: schema.minimum, message: `Минимальное число равно ${schema.minimum}`},
        max: schema.maximum && { value: schema.maximum, message: `Максимальное число равно ${schema.maximum}`},
      }}
      render={({ field, fieldState }) => (
        <TextField
          fullWidth
          margin="dense"
          size="small"
          type="number"
          required={required}
          label={title}
          {...field}
          value={field.value ?? ''}
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
