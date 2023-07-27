import { expect } from "@jest/globals";
import ForecastResponse from "../../models/apiResponses/forecastResponse";
import HourlyVariables from "../../models/hourlyVariables.enum";
import ForecastResponseSchema from "../../models/apiResponses/forecastResponseSchema";
import DriverBase from "../driverBase";
import DailyVariables from "../../models/dailyVariables.enum";
import { Inject, Service } from "typedi";
import ForecastApi from "./forecastApi";

@Service({ transient: true })
export default class ForecastApiDriver extends DriverBase<ForecastResponse> {

  // Opening bug in TypeDI prevent property injection with Jest
  // https://github.com/typestack/typedi/issues/1084
  // @Inject()
  forecastApi: ForecastApi

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

  async validateDailyData(respBody: ForecastResponse, dailyVariables: DailyVariables[]) {
    expect(respBody).toHaveProperty(['daily', 'time']);
    expect(respBody).toHaveProperty(['daily_units', 'time']);
    dailyVariables.forEach(dailyVariable => {
      expect(respBody).toHaveProperty(['daily', dailyVariable]);
      expect(respBody).toHaveProperty(['daily_units', dailyVariable]);
      expect(respBody.daily.time.length).toEqual(respBody.daily[dailyVariable].length);
    });
  }
}