import axios from "axios";
import City from "../../models/city.type";
import ApiBase from "../apiBase";
import ForecastResponse from "../../models/apiResponses/forecastResponse";
import HourlyVariables from "../../models/hourlyVariables.enum";
import DailyVariables from "../../models/dailyVariables.enum";
import ErrorResponse from "../../models/apiResponses/errorResponse";

export default class ForecastApi extends ApiBase<ForecastResponse> {

  getBaseUrl(): string {
    return 'https://api.open-meteo.com/v1/forecast';
  }

  withCity(city: City) {
    this.urlBuilder.setParameter('latitude', city.latitude.toString());
    this.urlBuilder.setParameter('longitude', city.longitude.toString());
    return this;
  }

  withHourlyVariables(hourlyVariables: HourlyVariables[]) {
    /* Join with comma
     * For example, hourlyVariables = ['temperature_2m', 'relativehumidity_2m']
     * After joined, add query parameter: hourly=temperature_2m,relativehumidity_2m
     */
    this.urlBuilder.setParameter('hourly', hourlyVariables.join());
    return this;
  }

  withDailyVariables(dailyVariables: DailyVariables[]) {
    /* Join with comma
     * For example, hourlyVariables = ['weathercode', 'temperature_2m_max', 'temperature_2m_min']
     * After joined, add query parameter: daily=weathercode,temperature_2m_max,temperature_2m_min
     */
    this.urlBuilder.setParameter('daily', dailyVariables.join());
    return this;
  }

  withTimezone(timezone: string) {
    this.urlBuilder.setParameter('timezone', timezone);
    return this;
  }

  async query() {
    return axios.get<ForecastResponse | ErrorResponse>(this.urlBuilder.build());
  }
}