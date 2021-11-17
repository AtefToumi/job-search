import e, { Request, Response, NextFunction } from 'express';
import { successResponse, failResponse } from '../helpers/methods';
import bcryptjs from 'bcryptjs';
import User from '../models/user.model';
import logging from '../config/logging';
import signJWT from '../functions/signJWT';

const NAMESPACE = 'User';

export const validateToken = (req: Request, res: Response) => {
  logging.info(NAMESPACE, 'Token validated, user authorized');

  return res.status(200).json({
    message: 'Authorized'
  })
};

export const login = (req: Request, res: Response) => {
  let { email, password } = req.body;
  User.find({ email })
    .exec()
    .then((users: any) => {
      console.log(email)
      if (users.length !== 1) {
        return res.status(401).json({
          message: 'Unauthorized'
        })
      }
      bcryptjs.compare(password, users[0].password, (error, result) => {
        if (error) {
          // logging.error(NAMESPACE, error.message, error);
          console.log(error)
          return res.status(401).json({
            message: password
          })
        }
        else if (result) {
          signJWT(users[0], (_error, token) => {
            if (_error) {
              logging.error(NAMESPACE, 'Unable to sign token: ', _error);

              return res.status(401).json({
                message: 'Unauthorized',
                error: _error
              })
            }
            else if (token) {
              {
                return res.status(200).json({
                  message: 'Auth successful',
                  token
                })
              }
            }
          });
        }
        else {
          res.status(401).json({
            message: "Invalid"
          })
        }
      })
    })
    .catch((error: any) => {
      return res.status(500).json({
        message: error.message,
        error
      });
    });
};


export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find()
    .select('-password')
    .exec()
    .then((users: any) => {
      return res.status(200).json({
        users,
        count: users.length
      })
    })
    .catch((error: any) => {
      return res.status(500).json({
        message: error.message,
        error
      });
    });
};


export const register = (req: Request, res: Response) => {
  let { email, password, name, dateOfBirth, gender, address, phone } = req.body;

  bcryptjs.hash(password, 10, (hashError, hash) => {
    if (hashError) {
      return res.status(500).json({
        message: hashError.message,
        error: hashError
      });
    }
    const _user = new User({
      email,
      password: hash,
      name,
      dateOfBirth,
      gender,
      address,
      phone
    });

    return _user.save()
      .then((user: any) => {
        return res.status(201).json({
          id: user._id
        });
      }).catch((error: any) => {
        return res.status(500).json({
          message: error.message,
          error
        })
      })
  })
};


/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const users = async (req: Request, res: Response): Promise<void> => {
  User.find({}, { __v: 0 }, function (err: any, result: any) {
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
  }).populate('education experience skills');

}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
// export const createUser = async (req: Request, res: Response): Promise<void> => {
//   // console.log(Skill.findOne({_id: req.body.skills}).populate('skills','title').lean())
//   const user = new User({
//     email: req.body.email,
//     name: req.body.name,
//     dateOfBirth: new Date(req.body.dateOfBirth),
//     gender: req.body.gender,
//     address: req.body.address,
//     phone: req.body.phone,
//     skills: req.body.skills,
//     // skills: Skill.findOne({skill: req.body.skills._id}).populate('skills','title')
//   });

//   user.save((err: any) => {
//     if (err) {
//       res.send(failResponse('error', { message: err.message }))
//     } else {
//       res.send(successResponse(
//         'User created successfully!',
//         {
//           data: (user)
//         }
//       ))
//     }
//   });
// }

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const getUser = async (req: Request, res: Response): Promise<void> => {
  User.findById(req.params.id, { __v: 0 }, (err: any, user: any) => {

    if (err) {
      res.send(failResponse('User not found', { err }));
    } else {
      res.send(successResponse(
        'User found',
        {
          data: (user)
        }
      ));
    }
  }).populate('skills experience education');
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export let updateUser = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body);
  let user = User.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err: any, user: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully updated user!");
      }
    }
  );
}
/**
*
* @param req
* @param res
* @returns {Promise<void>}
*/
export let deleteUser = async (req: Request, res: Response): Promise<void> => {
  let user = User.deleteOne({ _id: req.params.id }, (err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Successfully Deleted User");
    }
  });
};
