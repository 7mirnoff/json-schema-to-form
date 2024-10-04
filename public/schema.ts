export const data = {
  'type': 'object',
  'properties': {
    'streetAddress': {
      'type': 'string',
      'minLength': 2,
      'maxLength': 5
    },
    'city': {
      'type': 'string',
    },
    'state': {
      'type': 'string',
    },
    'gender': {
      'enum': [
        'male',
        'female',
        'else',
      ],
    },
    'phones': {
      'type': 'array',
      'maxItems': 3,
      'minItems': 2,
      'items': {
        'type': 'string',
        'minLength': 1,
        'maxLength': 255,
      },
    },
    'parents': {
      'type': 'array',
      'minItems': 0,
      'maxItems': 2,
      'items': {
        'type': 'object',
        'properties': {
          'relation': {
            'enum': [
              'mother',
              'father',
            ],
          },
          'age': {
            'type': 'integer',
            'minimum': 5,
            'maximum': 10
          },
          'name': {
            'type': 'string',
          },
          'secondName': {
            'type': 'string',
          },
          'grandFather': {
            'type': 'object',
            'name': {
              'type': 'string',
            },
            'age': {
              'type': 'integer',
            },
            'secondName': {
              'type': 'string',
            },
            'retired': {
              'type': 'boolean',
            },
          },
          'grandMother': {
            'type': 'object',
            'properties': {
              'name': {
                'type': 'string',
              },
              'age': {
                'type': 'integer',
              },
              'secondName': {
                'type': 'string',
              },
              'retired': {
                'type': 'boolean',
              },
            },
            'required': ['age', 'name', 'retired']
          },
        },
        required: ['age']
      },
    },
  },
  'required': [
    'streetAddress',
    'city',
    'state',
    'gender'
  ],
}