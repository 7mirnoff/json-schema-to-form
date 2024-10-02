import React from 'react'
import { FieldEnumProps } from './types.ts'
import { Controller, useFormContext } from 'react-hook-form'
import { MenuItem, TextField } from '@mui/material'

export const EnumField: React.FC<FieldEnumProps> = ({ fieldName, schema, required }) => {
  const form = useFormContext()

  return (
    <Controller
      name={fieldName}
      defaultValue={null}
      control={form.control}
      rules={{
        required: { value: Boolean(required), message: 'Обязательное поле' },
      }}
      render={({ field, fieldState }) => (
        <TextField
          select
          fullWidth
          margin="normal"
          label={schema.title ?? fieldName}
          {...field}
          error={fieldState.invalid}
          helperText={fieldState.error?.message}
          value={field.value ?? ''}
          onChange={(evt) => {
            field.onChange(evt.target.value || null)
          }}
        >
          <MenuItem value=''>
            Не выбрано
          </MenuItem>
          {schema.enum.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  )
}