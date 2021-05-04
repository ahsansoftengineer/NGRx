export interface IUser{
  id: number;
  name: string;
  email:string;
  address: Address;
  username: string;
  phone: string;
  website:string;
  company: Company
}

export interface Address{
  street: string;
  suite: string;
  'city': string;
  'zipcode': string;
  geo:Geo
}
export interface Geo{
  'lat': string
  'lng': string
}
export interface Company{
  name:string;
  catchPharase: string;
  bs: string
}