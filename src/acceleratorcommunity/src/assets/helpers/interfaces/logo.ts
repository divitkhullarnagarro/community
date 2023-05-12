export interface LogoInterface {
  fields: Fields;
}

export interface Fields {
  data: Data;
}

export interface Data {
  datasource: Datasource;
}

export interface Datasource {
  image: Image;
  logoURL: LogoUrl;
}

export interface Image {
  jsonValue: JsonValue;
}

export interface JsonValue {
  value: Value;
}

export interface Value {
  src: string;
  alt: string;
  width: string;
  height: string;
}

export interface LogoUrl {
  jsonValue: JsonValue2;
}

export interface JsonValue2 {
  value: Value2;
}

export interface Value2 {
  href: string;
  text: string;
  anchor: string;
  linktype: string;
  class: string;
  title: string;
  querystring: string;
  id: string;
}
