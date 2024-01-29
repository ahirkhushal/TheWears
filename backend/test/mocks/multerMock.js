const multerMock = () => ({
  array: (fieldName, maxCount) => (req, res, next) => {
    const files = Array.from({ length: maxCount }, (_, index) => ({
      fieldname: fieldName,
      filename: `mock-image-${index + 1}.jpg`,
      encoding: '7bit',
      mimetype: 'image/jpeg',
      buffer: Buffer.from(`mock-image-${index + 1}-content`),
      size: 12345,
    }));

    req.files = files;

    next();
  },
});

module.exports = multerMock;
