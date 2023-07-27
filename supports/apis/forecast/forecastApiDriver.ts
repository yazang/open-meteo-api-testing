import { expect } from "@jest/globals";
import ForecastResponse from "../../models/apiResponses/forecastResponse";
import HourlyVariables from "../../models/hourlyVariables.enum";
import ForecastApi from "./forecastApi";
import ForecastResponseSchema from "../../models/apiResponses/forecastResponseSchema";
import DriverBase from "../driverBase";

export default class ForecastApiDriver extends DriverBase<ForecastResponse> {
  private readonly forecastApi: ForecastApi;

  constructor() {
    super(ForecastResponseSchema);
    this.forecastApi = new ForecastApi();
  }

  async validateHourlyData(respBody: ForecastResponse, hourlyVariables: HourlyVariables[]) {
    expect(respBody).toHaveProperty(['hourly', 'time']);
    expect(respBody).toHaveProperty(['hourly_units', 'time']);
    hourlyVariables.forEach(hourlyVariable => {
      expect(respBody).toHaveProperty(['hourly', hourlyVariable]);
      expect(respBody).toHaveProperty(['hourly_units', hourlyVariable]);
      expect(respBody.hourly.time.length).toEqual(respBody.hourly[hourlyVariable].length);
    });
  }
}