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
    app.get('/users', UserController.users)
    app.post('/users/register', UserController.register)
    app.get('/users/:id', UserController.getUser)
}