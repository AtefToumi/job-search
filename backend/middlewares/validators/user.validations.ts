import { body, ValidationChain } from 'express-validator'

export const userValidator: ValidationChain[] = [
    body('email')
        .exists()
        .withMessage('email is required'),
    body('email')
        .exists()
        .isEmail()
        .withMessage('email is invalid'),

]