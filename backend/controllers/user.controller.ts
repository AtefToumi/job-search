import e, { Request, Response, NextFunction } from 'express';
import { successResponse, failResponse } from '../helpers/methods';
import bcryptjs from 'bcryptjs';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import logging from '../config/logging';
import signJWT from '../functions/signJWT';
import { IUser } from '../interfaces/user.interface';
const jwt = require("jsonwebtoken");

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
      if (users.length !== 1) {
        return res.status(401).json({
          message: 'Unauthorized'
        })
      }
      bcryptjs.compare(password, users[0].password, (error, result) => {
        if (error) {
          logging.error(NAMESPACE, error.message, error);

          return res.status(401).json({
            message: 'Password incorrect'
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


let refreshTokens: string[] = [];

const registerUser = async (
  req: Request,
  res: Response
): Promise<e.Response<any, Record<string, any>>> => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send("All inputs are required");
    }

    // Checking if the user already exists

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(400).send("User Already Exist. Please Login");
    }

    const user: IUser = new User({
      email: email,
    });

    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(password, salt);

    user.save().then((doc) => {
      // Generating Access and refresh token
      const token = jwt.sign(
        { user_id: doc._id, email: email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "5min",
        }
      );

      const refreshToken = jwt.sign(
        { user_id: doc._id, email: email },
        process.env.JWT_SECRET_KEY
      );

      refreshTokens.push(refreshToken);

      return res.status(201).json({
        user: doc,
        token: token,
        refresh: refreshToken,
      });
    });

    return res.status(400).send("Unable to create user");
  } catch (error) {
    throw error;
  }
};

const loginUser = async (
  req: Request,
  res: Response
): Promise<e.Response<any, Record<string, any>>> => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send("All inputs are required");
    }

    // Checking if the user exists

    const user: IUser | null = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email: email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "5min",
        }
      );

      const refreshToken = jwt.sign(
        { user_id: user._id, email: email },
        process.env.JWT_SECRET_KEY
      );

      refreshTokens.push(refreshToken);

      // user
      return res.status(200).json({
        user: user,
        token: token,
        refresh: refreshToken,
      });
    }

    return res.status(400).send("Invalid Credentials");
  } catch (error) {
    throw error;
  }
};

export { registerUser, loginUser };