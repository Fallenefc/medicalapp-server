import { Provider } from './provider';

export interface PatientRaw {
  name: string,
  DoB: string, // also have to figure out what kind of date we are going to use
  sex: string,
  providers: Provider[],
}

export interface Patient extends PatientRaw {
  uid: string,
  createdAt: string
}
