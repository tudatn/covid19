export interface DataType {
  country: string;
  province?: string;
  recovered: string;
  update: string;
  active: string;
  confirmed: string;
  deaths: string;
  lat?: string;
  lon?: string;
}

export interface TimeDataType {
  country: string;
  update: string;
  confirmed: string;
  deaths: string;
}
