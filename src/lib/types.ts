export interface GymData {
  data: Data;
}
export interface Data {
  allGym: AllGym;
  urls: Urls;
}
export interface AllGym {
  nodes?: NodesEntity[] | null;
}
export interface NodesEntity {
  name: string;
  gymId: string;
  email: string;
  slug: string;
  address: Address;
  location: Location;
  monthly: Monthly;
  status: string;
  joinable: boolean;
  seo: Seo;
}
export interface Address {
  address1: string;
  address2?: string | null;
  address3?: string | null;
  postalCode: string;
}
export interface Location {
  latitude: number;
  longitude: number;
}
export interface Monthly {
  packages?: (PackagesEntity | null)[] | null;
}
export interface PackagesEntity {
  accessLevel: string;
  normalPrice: number;
  currentPrice: number;
  salesTax?: null;
  joiningFeeSalesTax?: null;
}
export interface Seo {
  presentationName?: string | null;
}
export interface Urls {
  authLogin: string;
  authLogout: string;
  joinJoin: string;
}
