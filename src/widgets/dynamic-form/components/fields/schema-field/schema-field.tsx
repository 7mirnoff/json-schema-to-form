import React, { Fragment } from 'react'
import { FieldSchemaProps } from './types'
import { EnumField } from '../enum-field'
import { ArrayField } from '../array-field'
import { StringField } from '../string-field'
import { Schema } from '@entities'
import { Typography } from '@mui/material'
import { IntegerField } from '../integer-field'
import { BooleanField } from '../boolean-field'
import { filterAnnotationKeys, isEnumSchema, isPropertiesSchema } from '../../../utils.ts'

export const SchemaField: React.FC<FieldSchemaProps> = ({ path, schema, required }) => {
  function renderFields(schema: Schema, fieldName: string, required?: Set<string>): React.ReactElement {
    if (isEnumSchema(schema)) {
      const isRequired = required?.has(fieldName)

      return <EnumField fieldName={fieldName} schema={schema} required={isRequired} />
    }

    if (schema.type === 'array') {
      const isRequired = required?.has(fieldName)
      return <ArrayField fieldName={fieldName} schema={schema} required={isRequired} />
    }

    if (schema.type === 'string') {
      const isRequired = required?.has(fieldName)
      return <StringField fieldName={fieldName} schema={schema} required={isRequired} />
    }

    if (schema.type === 'integer') {
      const isRequired = required?.has(fieldName)
      return <IntegerField fieldName={fieldName} schema={schema} required={isRequired} />
    }

    if (schema.type === 'boolean') {
      const isRequired = required?.has(fieldName)
      return <BooleanField fieldName={fieldName} schema={schema} required={isRequired} />
    }

    if (schema.type === 'object') {
      let entries: Array<[string, Schema]>
      let currentRequired: Set<string> | undefined

      if (isPropertiesSchema(schema)) {
        entries = Object.entries(schema.properties)
        currentRequired = new Set(schema.required)
      } else {
        entries = Object.entries(schema).filter(filterAnnotationKeys)
        console.log(entries)
      }

      return <>
        {entries.map(([key, entity]) => {
          return <Fragment key={key}>
            {renderFields(entity, path.concat(key), currentRequired)}
          </Fragment>
        })}
      </>
    }

    return <Typography>Unimplemented type</Typography>
  }

  return renderFields(schema, path, required)
}