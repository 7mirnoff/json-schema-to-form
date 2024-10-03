import React, { useMemo } from 'react'
import { FieldArrayProps } from './types.ts'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { SchemaField } from '../schema-field'
import { Box, Button, Typography } from '@mui/material'

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
    append('')
  }
  const removeField = (index: number) => {
    console.log(index)
    remove(index)
  }

  // schema.items.
  // name={`items.${index}.displayName`}
  return (
    <div>
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
      {fields.map((_, index) => {
        const path = `${fieldName}.${index}.`
        console.log(path)
        return <Box key={path} display="flex" gap={2}>
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