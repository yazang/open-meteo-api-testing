import ErrorResponse from "../../models/apiResponses/errorResponse";
import SearchResponse from "../../models/apiResponses/searchResponse";
import Country from "../../models/countries.enum";
import SearchApi from "./searchApi";

export default class SearchApiDriver {
  private readonly searchApi: SearchApi;

  constructor() {
    this.searchApi = new SearchApi();
  }

  // By default, search New Zealand cities.
  //TODO: cache search city result
  async getCityCoordinates(cityName: string, countryCode = Country.NewZealand) {
    const apiResponse = await this.searchApi.withCityName(cityName).query();
    if (apiResponse.status === 200) {
      const responseBody = apiResponse.data as SearchResponse;
      const city = responseBody.results.find(r => r.name === cityName && r.country_code === countryCode);
      if (!city) throw new Error(`City not found: ${cityName}, ${countryCode}`);
      return city;
    } else {
      const errorResponse = apiResponse.data as ErrorResponse;
      throw new Error(`getCityCoordinates failed with reason: ${errorResponse.reason}`);
    }
  }
}