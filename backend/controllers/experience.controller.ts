import { Request, Response } from 'express'
import { successResponse, failResponse } from '../helpers/methods'
import Experience from '../models/experience.model'

//lists all skills
export const experienceList = async (req: Request, res: Response): Promise<void> => {
    Experience.find({}, { __v: 0 }, function (err: any, result: any) {
        if (err) {
            res.send(failResponse('error', {}))
        } else {
            res.send(successResponse(
                'list of experiences',
                {
                    data: (result)
                }
            ))
        }
    });

}

//add skill
export const addExperience = async (req: Request, res: Response): Promise<void> => {
    console.log(req.body)
    const experience = new Experience({
        company: req.body.company,
        role: req.body.role,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description
    });

    experience.save((err: any) => {
        if (err) {
            res.send(failResponse('error', { message: err.message }))
        } else {
            res.send(successResponse(
                'Experience infos added successfully!',
                {
                    data: (experience)
                }
            ))
        }
    });
}

export const getExperience = async (req: Request, res: Response): Promise<void> => {
    Experience.findById(req.params.id, { __v: 0 }, (err: any, experience: any) => {
        if (err) {
            res.send(failResponse('no info found in database', { err }));
        } else {
            res.send(successResponse(
                'Experience infos found',
                {
                    data: (experience)
                }
            ));
        }
    });
}

export let updateExperience = async (req: Request, res: Response): Promise<void> => {
    console.log(req.body);
    let experience = Experience.findByIdAndUpdate(
        req.params.id,
        req.body,
        (err: any, experience: any) => {
            if (err) {
                res.send(err);
            } else {
                res.send("Experience infos updated!");
            }
        }
    );
}

export let deleteExperience = async (req: Request, res: Response): Promise<void> => {
    let experience = Experience.deleteOne({ _id: req.params.id }, (err: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send("Exprience infos deleted");
        }
    });
}