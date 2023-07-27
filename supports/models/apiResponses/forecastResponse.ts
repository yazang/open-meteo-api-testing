type ForecastResponse = {
  elevation: number;
  generationtime_ms: number;
  daily?: any;
  daily_units?: any;
  hourly?: any;
  hourly_units?: any;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}

export default ForecastResponse;