const ForecastResponseSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "properties": {
        "daily": {},
        "daily_units": {},
        "elevation": {
            "type": "number"
        },
        "generationtime_ms": {
            "type": "number"
        },
        "hourly": {},
        "hourly_units": {},
        "latitude": {
            "type": "number"
        },
        "longitude": {
            "type": "number"
        },
        "timezone": {
            "type": "string"
        },
        "timezone_abbreviation": {
            "type": "string"
        },
        "utc_offset_seconds": {
            "type": "number"
        }
    },
    "required": [
        "elevation",
        "generationtime_ms",
        "latitude",
        "longitude",
        "timezone",
        "timezone_abbreviation",
        "utc_offset_seconds"
    ],
    "type": "object"
};

export default ForecastResponseSchema;