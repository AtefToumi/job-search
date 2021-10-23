import { Request, Response } from 'express'
import User from '../models/user.model'
import { successResponse, failResponse } from '../helpers/methods'

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const users = async (req: Request, res: Response): Promise<void> => {
  User.find({}, {_id: 0, __v: 0}, function(err: any, result: any) {
    if (err) {
      res.send(failResponse('error', {}))
    } else {
      res.send(successResponse(
        'list of users',
        {
          data: (result)
        }
      ))
    }
  });

}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    dateOfBirth: new Date(req.body.dateOfBirth),
    gender: req.body.gender,
    address: req.body.address,
  });

  user.save((err: any) => {
    if (err) {
      res.send(failResponse('error', {}))
    } else {
      res.send(successResponse(
        'User created successfully!',
        {
          data: ''
        }
      ))
    }
  });




}
