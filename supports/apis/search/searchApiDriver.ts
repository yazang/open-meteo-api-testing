import Country from "../../models/countries.enum";
import SearchApi from "./searchApi";

export default class SearchApiDriver {
  private readonly searchApi: SearchApi;

  constructor() {
    this.searchApi = new SearchApi();
  }

  //TODO: cache search city result
  // By default, search New Zealand cities.
  async getCityCoordinates(cityName: string, countryCode = Country.NewZealand) {
    const apiResponse = await this.searchApi.withCityName(cityName).query();
    const responseBody = apiResponse.data;
    const city = responseBody.results.find(r => r.name === cityName && r.country_code === countryCode);
    if (!city) throw new Error(`City not found: ${cityName}, ${countryCode}`);
    return city;
  }
}