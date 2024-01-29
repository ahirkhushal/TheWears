//FILTER OBJECT
const filterObj = (obj, ...allowedField) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedField.includes(el)) {
      newObj[el] = obj[el];
    }
  });

  return newObj;
};

module.exports = filterObj;
