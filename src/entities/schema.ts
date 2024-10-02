
export interface SchemaAnnotation {
  title?: string
  description?: string
}

export interface EnumSchema extends SchemaAnnotation {
  enum: Array<string | number>
}

export interface BooleanSchema extends SchemaAnnotation {
  type: 'boolean'
}

export interface StringSchema extends SchemaAnnotation {
  type: 'string',
  minLength?: number,
  maxLength?: number
}

export interface IntegerSchema extends SchemaAnnotation {
  type: 'integer',
  minimum: number,
  maximum: number
}

export interface ObjectSchema extends SchemaAnnotation {
  type: 'object',
  properties: {
    [k: string]: Schema
  },
  required?: Array<string>
}

type AllOfItems = BooleanSchema | StringSchema | IntegerSchema | ObjectSchema
export interface ArraySchema extends SchemaAnnotation {
  type: 'array',
  maxItems: number,
  minItems: number,
  items: AllOfItems
}

export type Schema =
  | BooleanSchema
  | StringSchema
  | IntegerSchema
  | ArraySchema
  | ObjectSchema
  | EnumSchema