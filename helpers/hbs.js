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
  },
  editIcon: function(thoughtUser, loggedUser, thoughtID, floating = true) {
     return thoughtUser._id.toString() === loggedUser._id.toString() ?
      floating ? 
        `<a href="/thoughts/edit/${thoughtID}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>` :
        `<a href="/thoughts/edit/${thoughtID}"><i class="fas fa-edit"></i></a>` :
     '' ;
  },
  editSelect: function (selected, options) {
    return options.fn(this).replace(
        new RegExp(' value=\"' + selected + '\"'),
        '$& selected="selected"');
  },
}