# open-meteo-api-testing

## Prerequisites

### Install node dependencies

```
$ npm install
```

### Install Jest

```
$ npm install jest --global
```

### Generate JSON schemas

JSON schemas are used to validate API response body. They can be generated from response types.

Please make sure to generate them before running tests.

Use this tool as an example https://github.com/YousefED/typescript-json-schema
```
$ typescript-json-schema "supports/models/apiResponses/forecastResponse.ts" ForecastResponse --required
```

## Running tests

```
$ npm test
```
