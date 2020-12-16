import {
  IAccessTokenFromAuthorizationCodeRespose,
  IAdwordsReportInstance,
  IGoogleAuthInstance,
  IGoogleService,
} from '../types/adwordsService'

export const googleGetAccessTokenFromAuthorizationCode = (
  googleAuthInstance: IGoogleAuthInstance,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  code: string | any,
): Promise<IAccessTokenFromAuthorizationCodeRespose> => {
  return new Promise((resolve, reject) => {
    googleAuthInstance.getAccessTokenFromAuthorizationCode(code, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

export const googleGetReport = (
  adWordsReportInstance: IAdwordsReportInstance,
  apiVersion: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reportOptions: Record<string, any>,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    adWordsReportInstance.getReport(apiVersion, reportOptions, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const googleGetRequest = (service: IGoogleService, getMethod: string, selectors = {}): Promise<any> => {
  return new Promise((resolve, reject) => {
    service[getMethod](selectors, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}
