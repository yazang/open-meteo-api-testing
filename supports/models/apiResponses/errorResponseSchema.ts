const ErrorResponseSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "properties": {
      "error": {
          "type": "boolean"
      },
      "reason": {
          "type": "string"
      }
  },
  "required": [
      "error",
      "reason"
  ],
  "type": "object"
};

export default ErrorResponseSchema;