module.exports = {
  googleGetAccessTokenFromAuthorizationCode: (googleAuthInstance, code) => {
    return new Promise((resolve, reject) => {
      googleAuthInstance.getAccessTokenFromAuthorizationCode(code, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },

  googleGetReport: (report, apiVersion, reportOptions) => {
    return new Promise((resolve, reject) => {
      report.getReport(apiVersion, reportOptions, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },

  googleGetRequest: (service, getMethod, selectors = {}) => {
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
}
