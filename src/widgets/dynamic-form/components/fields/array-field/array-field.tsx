import React, { useMemo } from 'react'
import { FieldArrayProps } from './types.ts'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { SchemaField } from '../schema-field'
import { Box, Button, Typography } from '@mui/material'

export const ArrayField: React.FC<FieldArrayProps> = ({ fieldName, schema }) => {
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
    remove(index)
  }

  // schema.items.
  // name={`items.${index}.displayName`}
  return (
    <div>
      <Typography variant="h6" component="h2">
        {schema.title ?? fieldName}
      </Typography>
      {fields.map((_, index) => {
        const path = `${fieldName}.${index}.`

        return <Box key={path} display="flex" gap={2} flexWrap='wrap'>
          <SchemaField
            schema={schema.items}
            path={path}
            required={itemsRequired}
          />
        </Box>
      })}
      <Button onClick={addField}>Add</Button>
    </div>
  )
}