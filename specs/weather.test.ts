import {describe, expect, test} from '@jest/globals';
import ForecastApi from '../supports/apis/forecast/forecastApi';
import HourlyVariables from '../supports/models/hourlyVariables.enum';
import SearchApiDriver from '../supports/apis/search/searchApiDriver';
import ForecastApiDriver from '../supports/apis/forecast/forecastApiDriver';
import DailyVariables from '../supports/models/dailyVariables.enum';
import ForecastResponse from '../supports/models/apiResponses/forecastResponse';
import ErrorResponse from '../supports/models/apiResponses/errorResponse';

describe('query city weather', () => {
  // Data driven test cases
  test.each([
    ['Wellington', [HourlyVariables.Temperature_2m, HourlyVariables.RelativeHumidity_2m]],
    ['Auckland', [HourlyVariables.Rain, HourlyVariables.Winddirection_10m, HourlyVariables.Windspeed_10m]],
    ['Wellington', []],
  ])('can successfully get hourly weather from %s with variables %o', async (cityName, hourlyVariables) => {
    // Arrange
    //TODO: use DI container to manage instances, to be refactored
    const searchApiDriver = new SearchApiDriver();
    const forecastApi = new ForecastApi();
    const forecastApiDriver = new ForecastApiDriver();
    const city = await searchApiDriver.getCityCoordinates(cityName);

    // Act
    const request = forecastApi.withCity(city);
    if (hourlyVariables && hourlyVariables.length > 0) {
      request.withHourlyVariables(hourlyVariables)
    }
    const resp = await request.query();

    // Assert
    // Validate api response status code
    expect(resp.status).toEqual(200);
    // Query successfully, parse response body as ForecastResponse
    const respBody = resp.data as ForecastResponse;
    // Validate api response body against predefined json schema
    forecastApiDriver.validateSuccessResponse(respBody);

    // Validate hourly weather data
    if (hourlyVariables && hourlyVariables.length > 0) {
      forecastApiDriver.validateHourlyData(respBody, hourlyVariables);
    }
  });

  test('get daily weather should return error without passing mandatory timezone parameter', async () => {
    // Arrange
    //TODO: use DI container to manage instances, to be refactored
    const searchApiDriver = new SearchApiDriver();
    const forecastApi = new ForecastApi();
    const forecastApiDriver = new ForecastApiDriver();
    const city = await searchApiDriver.getCityCoordinates('Auckland');
    const dailyVariables = [DailyVariables.Weathercode, DailyVariables.Sunrise];

    // Act
    /* 
     * Query daily variables without passing mandatory timezone parameter
     * Because axios throws exception when it finds api return error
     * Parse response from axios error and continue validation
     */
    let resp;
    try {
      await forecastApi
        .withCity(city)
        .withDailyVariables(dailyVariables)
        .query();
    } catch (error) {
      console.log('From daily test' + error.response.data.reason);
      resp = error.response;
    }

    // Assert
    expect(resp.status).toEqual(400);
    // Cast to ErrorResponse as Api returns 400
    const respBody = resp.data as ErrorResponse;
    // Validate api response body against predefined json schema
    forecastApiDriver.validateErrorResponse(respBody);
    // validate error body
    expect(respBody.error).toEqual(true);
    expect(respBody.reason).toMatch(/Timezone is required/);
  });

  test('should return error without passing coordinations', async () => {
    // Arrange
    //TODO: use DI container to manage instances, to be refactored
    const forecastApiDriver = new ForecastApiDriver();
    const forecastApi = new ForecastApi();
    const hourlyVariables = [HourlyVariables.Temperature_2m, HourlyVariables.RelativeHumidity_2m];

    // Act
    let resp;
    try {
      await forecastApi
        .withHourlyVariables(hourlyVariables)
        .query();
    } catch (error) {
      console.log(error.request.path);
      console.log('From hourly test' + error.response.data.reason);
      resp = error.response;
    }

    // Assert
    expect(resp.status).toEqual(400);
    // Cast to ErrorResponse as Api returns 400
    const respBody = resp.data as ErrorResponse;
    // Validate api response body against predefined json schema
    forecastApiDriver.validateErrorResponse(respBody);
    // validate error body
    expect(respBody.error).toEqual(true);
    expect(respBody.reason).toMatch(/required for key 'latitude'/);
  })
});