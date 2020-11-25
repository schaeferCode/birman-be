module.exports = {
  convertToKey: (targetString) => {
    // lowercase and turn spaces into dashes
    return targetString.split(' ').join('-').toLowerCase()
  }
}
