import { AxiosResponse } from "axios";
import UrlBuilder from "../utils/urlBuilder";

export default abstract class ApiBase<ResponseType> {
  abstract getBaseUrl(): string;
  protected readonly urlBuilder: UrlBuilder;

  constructor() {
    this.urlBuilder = new UrlBuilder(this.getBaseUrl());
  }

  abstract query(): Promise<AxiosResponse<ResponseType, any>>
}