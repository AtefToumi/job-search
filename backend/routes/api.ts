import {Express} from 'express-serve-static-core'
import * as IndexController from '../controllers/index.controller'
import * as UserController from '../controllers/user.controller'
import {validate} from "../middlewares/validators/wrapper.validator";
import {indexValidator} from "../middlewares/validators/index.validations";


//API Endpoints
/**
 *
 * @param app
 */
export const api = (app: Express) => {
    app.get('/', IndexController.index)
    app.post('/', validate(indexValidator), IndexController.indexPost)
    //return list of users
    app.get('/users', UserController.users)
    //register a user
    app.post('/users/register', UserController.register)
    //return a user by id
    app.get('/users/:id', UserController.getUser)
    //update a user by id
    app.put('/users/:id', UserController.updateUser)
    //delete a user by id
    app.delete('/users/:id', UserController.deleteUser)
}