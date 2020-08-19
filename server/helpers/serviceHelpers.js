module.exports = {
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
