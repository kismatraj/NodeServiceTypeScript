import { body } from 'express-validator';

const userDtoModel = [
  body('userId').isInt().trim().optional(),
  body('firstName')
    .isString()
    .isLength({ min: 1, max: 20 })
    .trim()
    .escape()
    .optional(),
  body('middleName')
    .isString()
    .isLength({ min: 1, max: 20 })
    .trim()
    .escape()
    .optional(),
  body('lastName')
    .isString()
    .isLength({ min: 1, max: 20 })
    .trim()
    .escape()
    .optional(),
  body('loginId').isString().isLength({ max: 50 }).trim().escape().optional(),
  body('password')
    .isStrongPassword()
    .isLength({ min: 6, max: 20 })
    .trim()
    .optional(),
  body('isActive').isBoolean().optional(),
];

export default userDtoModel;
