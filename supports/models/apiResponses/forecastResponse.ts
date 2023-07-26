type ForecastResponse = {
  elevation: number;
  generationtime_ms: number;
  hourly?: any;
  hourly_units?: any;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}

export default ForecastResponse;