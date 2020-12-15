import { Document } from 'mongoose'

export interface IAdService {
  accessToken: string
  dateUpdated?: Date
  expiryDate: string
  name: string
  refreshToken: string
  serviceClientId: string
}

export interface IActivatedAdServices {
  active: boolean
  dateUpdated?: Date
  name: string
  serviceUserId: string
}

export interface IClient {
  dateCreated?: Date
  dateUpdated?: Date
  key: string
  linkedAdServices: IActivatedAdServices[]
  name: string
}

export interface ITenantDocument extends Document {
  adServices: IAdService[]
  clients: IClient[]
  dateCreated?: Date
  dateUpdated?: Date
  key: string
  name: string
}

export interface IUserDocument extends Document {
  dateCreated?: Date
  dateUpdated?: Date
  clientKey?: string
  email: string
  familyName: string
  givenName: string
  passwordHash: string
  role: string
  tenantKey: string
  isValidPassword: (submittedPassword: unknown) => boolean
}

export interface IGetCustomersResponse {
  canManageClients: boolean
  customerId: string
  descriptiveName: string
}

export interface IManagedCustomerServiceResponseEntry {
  canManageClients: boolean
  name: string
}

export interface IGetManagedCustomerServiceResponse {
  entries: IManagedCustomerServiceResponseEntry[]
}
