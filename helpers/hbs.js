const moment = require('moment');

module.exports = {
  formatDate: function(date, format) {
    return moment(date).format(format)
  },
  stripHTMLTags: function(input) {
    return input.replace(/<(?:.|\n)*?>/gm,'')
  },
  shortenDisplay: function(str, limit) {
    if(str.length && str.length > limit) {
      let newStr = str.substr(0, limit)
      newStr = newStr.substr(0, newStr.lastIndexOf(' '))
      return `${newStr} ...`
    }

    return str
  }
}