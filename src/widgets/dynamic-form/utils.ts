import { EnumSchema, ObjectPropertiesSchema, ObjectSchema, Schema } from '@entities'

export const ANNOTATION_KEYS = ['type', 'title', 'enum', 'description']

export function isPropertiesSchema(schema: ObjectSchema): schema is ObjectPropertiesSchema {
  return typeof schema.properties === 'object'
}

export function isEnumSchema(schema: Schema): schema is EnumSchema {
  return 'enum' in schema && Array.isArray(schema.enum)
}

export function filterAnnotationKeys(entity: [string, Schema | string | undefined]): entity is [string, Schema] {
  return !ANNOTATION_KEYS.includes(entity[0])
}