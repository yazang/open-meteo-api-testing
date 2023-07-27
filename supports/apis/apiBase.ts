import axios from "axios";
import UrlBuilder from "../utils/urlBuilder";
import ErrorResponse from "../models/apiResponses/errorResponse";

export default abstract class ApiBase<ResponseType> {
  abstract getBaseUrl(): string;
  protected readonly urlBuilder: UrlBuilder;

  constructor() {
    this.urlBuilder = new UrlBuilder(this.getBaseUrl());
  }

  query() {
    return axios.get<ResponseType | ErrorResponse>(this.urlBuilder.build());
  }
}