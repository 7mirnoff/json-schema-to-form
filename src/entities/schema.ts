
export interface SchemaAnnotation {
  title?: string
  description?: string
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

export interface ArraySchema extends SchemaAnnotation {
  type: 'array',
  maxItems: number,
  minItems: number,
  items: BooleanSchema | StringSchema | IntegerSchema
}
export interface ObjectSchema extends SchemaAnnotation {
  type: 'object',
  properties: {
    [k: string]: Schema
  },
  required?: Array<string>
}


export type Schema =
  | BooleanSchema
  | StringSchema
  | IntegerSchema
  | ArraySchema
  | ObjectSchema