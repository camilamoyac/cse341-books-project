const { body, validationResult } = require('express-validator');

const authorValidationRules = () => {
  return [
    body('fullName').notEmpty().withMessage('Full name is required'),
    body('penName').optional().isString(),
    body('birthDate').notEmpty().isISO8601().toDate().withMessage('Valid birth date is required'),
    body('nationality').notEmpty().withMessage('Nationality is required'),
    body('books').isArray({ min: 1 }).withMessage('Books must be a non-empty array of titles')
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  const extractedErrors = errors.array().map(err => ({ [err.param]: err.msg }));
  return res.status(422).json({ errors: extractedErrors });
};

module.exports = {
  authorValidationRules,
  validate
};