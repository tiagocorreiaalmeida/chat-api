import joi from '@hapi/joi';

export const mergeJoiSchemas = (schemas: joi.ObjectSchema<any>[]): joi.ObjectSchema<any> => {
  let mergedSchema = joi.object();
  schemas.forEach((schema) => {
    mergedSchema = mergedSchema.concat(schema);
  });

  return mergedSchema;
};
