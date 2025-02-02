const { EVENT_FIELDS, EVENT } = require("../constants/events");

const getMissingRequiredFields = (type, data) => {
  if (type === EVENT) {
    return EVENT_FIELDS.filter((field) => !data[field]);
  }
  return data;
};

module.exports = {
  getMissingRequiredFields,
};
