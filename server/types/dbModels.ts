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

export interface IUser {
  dateCreated?: Date
  dateUpdated?: Date
  clientKey?: string
  email: string
  familyName: string
  givenName: string
  passwordHash: string
  role: string
  tenantKey: string
}

export interface IUserDocument extends IUser, Document {
  isValidPassword: (submittedPassword: unknown) => boolean
}
