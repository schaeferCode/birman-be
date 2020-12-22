import { Callback } from './index'

export type GenerateAuthUrl = (arg0: { access_type: string; prompt: string; scope: string; state: string }) => string

export interface IGoogleAuthInstance {
  getAccessTokenFromAuthorizationCode: (code: string, callback: Callback) => void
  oauth2Client: { generateAuthUrl: GenerateAuthUrl }
}

export interface IAdwordsReportInstance {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getReport: (apiVersion: string, reportOptions: Record<string, any>, callback: Callback) => void
}

export interface IGoogleService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [getCustomers: string]: (selectors: Record<string, any>, callback: Callback) => void
}

export interface IAccessTokenFromAuthorizationCodeRespose {
  access_token: string
  refresh_token: string
  expiry_date: string
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
