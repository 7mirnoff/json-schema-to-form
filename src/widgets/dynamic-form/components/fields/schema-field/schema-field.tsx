import React, { Fragment } from 'react'
import { FieldSchemaProps } from './types'
import { EnumField } from '../enum-field'
import { ArrayField } from '../array-field'
import { StringField } from '../string-field'
import { Schema } from '@entities'
import { Box, Typography } from '@mui/material'
import { IntegerField } from '../integer-field'
import { BooleanField } from '../boolean-field'
import { filterAnnotationKeys, isEnumSchema, isPropertiesSchema } from '../../../utils.ts'

export const SchemaField: React.FC<FieldSchemaProps> = ({ path, schema, title, required }) => {
  function renderFields(schema: Schema, fieldName: string, title = '', required?: Set<string>): React.ReactElement {
    if (isEnumSchema(schema)) {
      const isRequired = required?.has(title)

      return <EnumField fieldName={fieldName} title={title} schema={schema} required={isRequired} />
    }

    if (schema.type === 'array') {
      const isRequired = required?.has(title)
      return <ArrayField fieldName={fieldName} title={title} schema={schema} required={isRequired} />
    }

    if (schema.type === 'string') {
      const isRequired = required?.has(title)
      return <StringField fieldName={fieldName} title={title} schema={schema} required={isRequired} />
    }

    if (schema.type === 'integer') {
      const isRequired = required?.has(title)
      return <IntegerField fieldName={fieldName} title={title} schema={schema} required={isRequired} />
    }

    if (schema.type === 'boolean') {
      const isRequired = required?.has(title)
      return <BooleanField fieldName={fieldName} title={title} schema={schema} required={isRequired} />
    }

    if (schema.type === 'object') {
      let entries: Array<[string, Schema]>
      let currentRequired: Set<string> | undefined

      if (isPropertiesSchema(schema)) {
        entries = Object.entries(schema.properties)
        currentRequired = new Set(schema.required)
      } else {
        entries = Object.entries(schema).filter(filterAnnotationKeys)
      }

      return <Box width="100%">
        {title && <Typography>{title}</Typography>}
        {entries.map(([key, schema]) => {
          let entryPath = key
          if (fieldName) {
            entryPath = fieldName.endsWith('.') ? `${fieldName}${key}` : `${fieldName}.${key}`
          }

          return <Fragment key={key}>
            {renderFields(schema, entryPath, key, currentRequired)}
          </Fragment>
        })}
      </Box>
    }

    return <Typography>Unimplemented type</Typography>
  }

  return renderFields(schema, path, title, required)
}