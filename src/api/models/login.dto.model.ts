import { body } from 'express-validator';

const loginDtoModel = [
  body('loginId').isString().isLength({ max: 50 }).trim().escape().optional(),
  body('password')
    .isStrongPassword()
    .isLength({ min: 6, max: 20 })
    .trim()
    .optional(),
];

export default loginDtoModel;
