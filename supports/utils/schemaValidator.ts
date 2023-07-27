import { expect } from "@jest/globals";
import Ajv, { ValidateFunction } from "ajv";
const ajv = new Ajv();

export default class SchemaValidator {
  private validator: ValidateFunction;

  constructor(schema: any) {
    this.validator = ajv.compile(schema);
  }

  validate(data: any) {
    const valid = this.validator(data);
    if (!valid) console.log(this.validator.errors);
    expect(valid).toBeTruthy();
  }
}