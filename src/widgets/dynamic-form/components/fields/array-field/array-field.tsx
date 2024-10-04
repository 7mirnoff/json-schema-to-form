import React, { useMemo } from 'react'
import { FieldArrayProps } from './types.ts'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { SchemaField } from '../schema-field'
import { Box, Button, FormHelperText, Typography } from '@mui/material'
import { createArrayItemByType } from '../../../utils.ts'

export const ArrayField: React.FC<FieldArrayProps> = ({ fieldName, schema, title }) => {
  const { control, formState } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName,
    rules: {
      required: !!schema.minItems && {
        value: schema.minItems > 0,
        message: `Минимум ${schema.minItems ?? 1} элементов`,
      },
      minLength: schema.minItems && { value: schema.minItems, message: `Минимум ${schema.minItems} элементов` },
      maxLength: schema.maxItems && { value: schema.maxItems, message: `Максимум ${schema.maxItems} элементов` },
    },
  })

  // const error = formState.errors[title]?.root
  const hasMinItems = formState.errors[title]?.root?.type === 'minLength' || formState.errors[title]?.root?.type === 'required' && !!formState.errors[title]?.root.message
  const hasMaxItems = !!schema.maxItems && (fields?.length >= schema.maxItems)

  const itemsRequired = useMemo(() => {
    if ('required' in schema.items && Array.isArray(schema.items.required)) {
      return new Set(schema.items.required)
    }
  }, [schema])

  const addField = () => {
    append(createArrayItemByType(schema.items))
  }
  const removeField = (index: number) => {
    remove(index)
  }

  return (
    <Box>
      <Box display='flex' alignItems='center' gap={2}>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        {hasMinItems && <FormHelperText error>{formState.errors[title]?.root?.message as string}</FormHelperText>}
      </Box>
      {fields.map((field, index) => {
        const path = `${fieldName}.${index}.`
        return <Box key={field.id} display="flex" gap={2}>
          <Box mt={4}><Typography>{index + 1}</Typography></Box>
          <Box flexGrow={1}>
            <SchemaField
              schema={schema.items}
              path={path}
              required={itemsRequired}
            />
          </Box>
          <Box mt={2}>
            <Button onClick={() => {
              removeField(index)
            }} variant="outlined">
              Remove
            </Button>
          </Box>
        </Box>
      })}
      <Box display="flex" alignItems='center' gap={2}>
        <Button onClick={addField} variant="outlined"
                disabled={hasMaxItems}>Add</Button>
        {hasMaxItems &&
          <FormHelperText>Максимум {schema.maxItems} элементов</FormHelperText>
        }
      </Box>
    </Box>
  )
}