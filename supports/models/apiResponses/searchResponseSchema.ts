const SearchResponseSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "properties": {
      "results": {
          "items": {
              "properties": {
                  "country": {
                      "type": "string"
                  },
                  "country_code": {
                      "type": "string"
                  },
                  "country_id": {
                      "type": "number"
                  },
                  "elevation": {
                      "type": "number"
                  },
                  "feature_code": {
                      "type": "string"
                  },
                  "id": {
                      "type": "number"
                  },
                  "latitude": {
                      "type": "number"
                  },
                  "longitude": {
                      "type": "number"
                  },
                  "name": {
                      "type": "string"
                  },
                  "population": {
                      "type": "number"
                  },
                  "postcodes": {
                      "items": {
                          "type": "string"
                      },
                      "type": "array"
                  },
                  "timezone": {
                      "type": "string"
                  }
              },
              "required": [
                  "country",
                  "country_code",
                  "country_id",
                  "elevation",
                  "feature_code",
                  "id",
                  "latitude",
                  "longitude",
                  "name",
                  "population",
                  "timezone"
              ],
              "type": "object"
          },
          "type": "array"
      }
  },
  "required": [
      "results"
  ],
  "type": "object"
};

export default SearchResponseSchema;