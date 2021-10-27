import {Express} from 'express-serve-static-core'
import * as IndexController from '../controllers/index.controller'
import * as UserController from '../controllers/user.controller'
import * as SkillController from '../controllers/skill.controller'
import * as OfferController from '../controllers/offer.controller';
import * as EducationController from '../controllers/education.controller'
import * as CompanyController from '../controllers/company.controller';
import * as ApplicationController from '../controllers/application.controller';
import * as ExperienceController from '../controllers/experience.controller';

import {validate} from "../middlewares/validators/wrapper.validator";


import {indexValidator} from "../middlewares/validators/index.validations";
import {userValidator} from "../middlewares/validators/user.validations";


//API Endpoints
/**
 *
 * @param app
 */
export const api = (app: Express) => {
    app.get('/', IndexController.index)
    app.post('/', validate(indexValidator), IndexController.indexPost)

    //users
    //return list of users
    app.get('/users', UserController.users)
    //return a user by id   
    app.get('/users/:id', UserController.getUser)
    //register a user
    app.post('/users/register',validate(userValidator), UserController.register)
    //update a user by id
    app.put('/users/:id', UserController.updateUser)
    //delete a user by id
    app.delete('/users/:id', UserController.deleteUser)
    
    //skills
    //return list of users
    app.get('/skills', SkillController.skills)
    //return a user by id   
    app.get('/skills/:id', SkillController.getSkill)
    //register a user
    app.post('/skills/add', SkillController.addSkill)
    //update a user by id
    app.put('/skills/:id', SkillController.getSkill)
    //delete a user by id
    app.delete('/skills/:id', SkillController.deleteSkill)
    
    
    //applications
    //return list of users
    app.get('/applications', ApplicationController.applications)
    //return a user by id   
    app.get('/applications/:id', ApplicationController.getApplication)
    //register a user
    app.post('/applications/add',ApplicationController.createApplication)
    //update a user by id
    app.put('/applications/:id', ApplicationController.updateApplication)
    //delete a user by id
    app.delete('/applications/:id', ApplicationController.deleteApplication)
    
    //offers
    app.get('/offers', OfferController.offers)
    //return a user by id   
    app.get('/offers/:id', OfferController.getOffer)
    //register a user
    app.post('/offers/add', OfferController.addOffer)
    //update a user by id
    app.put('/offers/:id', OfferController.updateOffer)
    //delete a user by id
    app.delete('/offers/:id', OfferController.deleteOffer)
    
    //company
    app.get('/companies', CompanyController.companies)
    //return a user by id   
    app.get('/companies/:id', CompanyController.getCompany)
    //register a user
    app.post('/companies/add', CompanyController.addCompany)
    //update a user by id
    app.put('/companies/:id', CompanyController.updateCompany)
    //delete a user by id
    app.delete('/companies/:id', CompanyController.deleteCompany)
    
    //education
    app.get('/education', EducationController.educationList)
    //return a user by id   
    app.get('/education/:id', EducationController.getEducation)
    //register a user
    app.post('/education/add', EducationController.addEducation)
    //update a user by id
    app.put('/education/:id', EducationController.updateEducation)
    //delete a user by id
    app.delete('/education/:id', EducationController.deleteEducation)

    //experience
    app.get('/experience', ExperienceController.experienceList)
    //return a user by id   
    app.get('/experience/:id', ExperienceController.getExperience)
    //register a user
    app.post('/experience/add', ExperienceController.addExperience)
    //update a user by id
    app.put('/experience/:id', ExperienceController.updateExperience)
    //delete a user by id
    app.delete('/experience/:id', ExperienceController.deleteExperience)

}