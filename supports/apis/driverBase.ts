import ErrorResponse from "../models/apiResponses/errorResponse";
import ErrorResponseSchema from "../models/apiResponses/errorResponseSchema";
import SchemaValidator from "../utils/schemaValidator";

export default abstract class DriverBase<ResponseType> {

  private readonly successResponseSchemaValidator: SchemaValidator;
  private readonly errorResponseSchemaValidator: SchemaValidator;

  constructor(successResponseSchema: any) {
    this.successResponseSchemaValidator = new SchemaValidator(successResponseSchema);
    this.errorResponseSchemaValidator = new SchemaValidator(ErrorResponseSchema);
  }

  validateSuccessResponse(responseBody: ResponseType) {
    this.successResponseSchemaValidator.validate(responseBody);
  }

  validateErrorResponse(responseBody: ErrorResponse) {
    this.errorResponseSchemaValidator.validate(responseBody);
  }
}