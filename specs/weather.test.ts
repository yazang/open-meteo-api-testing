import {describe, expect, test} from '@jest/globals';
import ForecastApi from '../supports/apis/forecast/forecastApi';
import HourlyVariables from '../supports/models/hourlyVariables.enum';
import SearchApiDriver from '../supports/apis/search/searchApiDriver';
import ForecastResponseSchema from '../supports/models/apiResponses/forecastResponseSchema';
import SchemaValidator from '../supports/utils/schemaValidator';

const searchApiDriver = new SearchApiDriver();
const forecastApi = new ForecastApi();
const forecastHourlyRespSchemaValidator = new SchemaValidator(ForecastResponseSchema);

//TODO: add Allure test report

describe('query city weather', () => {
  // Data driven test cases
  test.each([
      ['Wellington', [HourlyVariables.Temperature_2m, HourlyVariables.RelativeHumidity_2m], 200],
      ['Wellington', [], 200],
    ])('get hourly weather from %s with variables %o', async (cityName, hourlyVariables, statusCode) => {
      // Arrange
      const city = await searchApiDriver.getCityCoordinates(cityName);

      // Act
      const request = forecastApi.withCity(city);
      if (hourlyVariables && hourlyVariables.length > 0) {
        request.withHourlyVariables(hourlyVariables)
      }
      const resp = await request.query();

      // Assert
      // Validate api response status code
      expect(resp.status).toEqual(statusCode);
      // Validate api response body against predefined json schema
      forecastHourlyRespSchemaValidator.validate(resp.data);

      // Validate hourly weather data
      if (hourlyVariables && hourlyVariables.length > 0) {
        expect(resp.data).toHaveProperty(['hourly', 'time']);
        expect(resp.data).toHaveProperty(['hourly_units', 'time']);
        hourlyVariables.forEach(hourlyVariable => {
          expect(resp.data).toHaveProperty(['hourly', hourlyVariable]);
          expect(resp.data).toHaveProperty(['hourly_units', hourlyVariable]);
          expect(resp.data.hourly.time.length).toEqual(resp.data.hourly[hourlyVariable].length);
        });
      }
  });

  test('get daily weather without setting timezone should return error', async () => {

  });
});