import { Request, Response } from 'express'
import { successResponse, failResponse } from '../helpers/methods'
import Application from '../models/application.model'

//lists all skills
export const applications = async (req: Request, res: Response): Promise<void> => {
    Application.find({}, { __v: 0 }, function (err: any, result: any) {
        if (err) {
            res.send(failResponse('error', {}))
        } else {
            res.send(successResponse(
                'list of applications',
                {
                    data: (result)
                }
            ))
        }
    });

}

//add skill
export const createApplication = async (req: Request, res: Response): Promise<void> => {
    console.log(req.body)
    const application = new Application({
        user_id: req.body.user_id,
        offer_id: req.body.offer_id,
    });

    application.save((err: any) => {
        if (err) {
            res.send(failResponse('error', { message: err.message }))
        } else {
            res.send(successResponse(
                'Application created successfully!',
                {
                    data: (application)
                }
            ))
        }
    });
}

export const getApplication = async (req: Request, res: Response): Promise<void> => {
    Application.findById(req.params.id, { __v: 0 }, (err: any, application: any) => {
        if (err) {
            res.send(failResponse('Application not in database', { err }));
        } else {
            res.send(successResponse(
                'Application found',
                {
                    data: (application)
                }
            ));
        }
    });
}

export let updateApplication = async (req: Request, res: Response): Promise<void> => {
    console.log(req.body);
    let application = Application.findByIdAndUpdate(
        req.params.id,
        req.body,
        (err: any, application: any) => {
            if (err) {
                res.send(err);
            } else {
                res.send("Application info updated!");
            }
        }
    );
}

export let deleteApplication = async (req: Request, res: Response): Promise<void> => {
    let application = Application.deleteOne({ _id: req.params.id }, (err: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send("Successfully deleted Application");
        }
    });
}