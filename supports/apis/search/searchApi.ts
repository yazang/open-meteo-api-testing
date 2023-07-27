import SearchResponse from '../../models/apiResponses/searchResponse';
import ApiBase from '../apiBase';

export default class SearchApi extends ApiBase<SearchResponse> {

  getBaseUrl(): string {
    return 'https://geocoding-api.open-meteo.com/v1/search'
  }

  withCityName(cityName: string) {
    this.urlBuilder.setParameter('name', cityName);
    return this;
  }
}