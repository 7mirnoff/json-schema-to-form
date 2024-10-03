import React, { useMemo } from 'react'
import { FieldArrayProps } from './types.ts'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { SchemaField } from '../schema-field'
import { Box, Button, Typography } from '@mui/material'
import { createArrayItemByType } from '../../../utils.ts'

export const ArrayField: React.FC<FieldArrayProps> = ({ fieldName, schema, title }) => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName,
  })

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
    <div>
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
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
      <Button onClick={addField} variant="outlined">Add</Button>
    </div>
  )
}