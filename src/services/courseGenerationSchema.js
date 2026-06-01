const nonEmptyString = { type: 'string', minLength: 1 };
const positiveInteger = { type: 'integer', minimum: 1 };

function object(properties) {
  return { type: 'object', additionalProperties: false, required: Object.keys(properties), properties };
}

const lessonSection = object({
  type: { type: 'string', enum: ['lesson'] },
  title: nonEmptyString,
  order_index: positiveInteger,
  content: { type: 'array', minItems: 1, items: nonEmptyString },
});

const tableSection = (type) => object({
  type: { type: 'string', enum: [type] },
  title: nonEmptyString,
  order_index: positiveInteger,
  introduction: nonEmptyString,
  columns: { type: 'array', minItems: 1, items: nonEmptyString },
  rows: {
    type: 'array',
    minItems: 1,
    items: { type: 'array', minItems: 1, items: nonEmptyString },
  },
});

const warningSection = object({
  type: { type: 'string', enum: ['warning'] },
  title: nonEmptyString,
  order_index: positiveInteger,
  content: { type: 'array', minItems: 1, items: nonEmptyString },
});

const mistakesSection = object({
  type: { type: 'string', enum: ['common_mistakes'] },
  title: nonEmptyString,
  order_index: positiveInteger,
  items: {
    type: 'array',
    minItems: 1,
    items: object({
      written_form: nonEmptyString,
      correct_pronunciation: nonEmptyString,
      common_mistake: nonEmptyString,
    }),
  },
});

export const COURSE_GENERATION_SCHEMA = object({
  modules: {
    type: 'array',
    minItems: 1,
    maxItems: 1,
    items: object({
      internal_id: nonEmptyString,
      title: nonEmptyString,
      description: nonEmptyString,
      order_index: positiveInteger,
      rules: {
        type: 'array',
        minItems: 1,
        maxItems: 1,
        items: object({
          internal_id: nonEmptyString,
          level: { type: 'string', enum: ['A1', 'A2', 'B1', 'B2', 'C1'] },
          title: nonEmptyString,
          category: nonEmptyString,
          learning_objective: nonEmptyString,
          short_description: nonEmptyString,
          order_index: positiveInteger,
          sections: {
            type: 'array',
            minItems: 1,
            items: { anyOf: [lessonSection, tableSection('examples_table'), warningSection, mistakesSection, tableSection('comparison_table')] },
          },
          exercises: {
            type: 'array',
            minItems: 1,
            items: object({
              internal_id: nonEmptyString,
              title: nonEmptyString,
              type: nonEmptyString,
              instructions: nonEmptyString,
              order_index: positiveInteger,
              questions: { type: 'array', minItems: 1, items: nonEmptyString },
            }),
          },
        }),
      },
    }),
  },
});
