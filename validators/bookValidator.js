const { body, validationResult } = require('express-validator');

const bookValidationRules = () => {
  return [
    body('title').notEmpty().withMessage('Title is required'),
    body('authors').isArray({ min: 1 }).withMessage('Authors must be a non-empty array'),
    body('publisher').notEmpty().withMessage('Publisher is required'),
    body('publicationDate').isISO8601().toDate().withMessage('Valid publication date required'),
    body('isbn').isArray({ min: 1 }).withMessage('ISBN must be a non-empty array'),
    body('language').notEmpty().withMessage('Language is required'),
    body('pageCount').isInt({ min: 1 }).withMessage('Page count must be a positive integer')
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const extractedErrors = errors.array().map(err => ({ [err.param]: err.msg }));
  return res.status(422).json({ errors: extractedErrors });
};

module.exports = {
  bookValidationRules,
  validate
};