export interface IUser{
  id: number;
  name: string;
  email:string;
  address: Address;
  username: string;
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
}