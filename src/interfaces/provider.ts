import { Patient } from './patient';

export interface ProviderRaw {
  email: string,
  password: string,
  name: string,
  title: string,
  patients: Patient[],
}

export interface ProviderInterface extends ProviderRaw {
  uid: number,
  resetPassword: string,
  createdAt: string // should it really be string?
}
