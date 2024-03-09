const format = require('date-fns/format');

function formatDate(date) {
  return format(new Date(date), 'MMMM dd, yyyy HH:mm');
}

module.exports = formatDate;
