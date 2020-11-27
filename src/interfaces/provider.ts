import { Patient } from './patient';

export interface ProviderRaw {
  email: string,
  password: string,
  name: string,
  title: string,
  patients: Patient[],
}

export interface Provider extends ProviderRaw {
  uid: number,
  createdAt: string // should it really be string?
}