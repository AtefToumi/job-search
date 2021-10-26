import { Request, Response } from 'express'
import { successResponse, failResponse } from '../helpers/methods'
import Education from '../models/education.model'

//lists all education fields stored in db
export const educationList = async (req: Request, res: Response): Promise<void> => {
    Education.find({}, { __v: 0 }, function (err: any, result: any) {
        if (err) {
            res.send(failResponse('error', {}))
        } else {
            res.send(successResponse(
                'list: ',
                {
                    data: (result)
                }
            ))
        }
    });

}

//add an education field
export const addEducation = async (req: Request, res: Response): Promise<void> => {
    console.log(req.body)
    const education = new Education({
        title: req.body.title,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        location: req.body.location,
    });

    education.save((err: any) => {
        if (err) {
            res.send(failResponse('error', { message: err.message }))
        } else {
            res.send(successResponse(
                'education created successfully!',
                {
                    data: (education)
                }
            ))
        }
    });
}

export const getEducation = async (req: Request, res: Response): Promise<void> => {
    Education.findById(req.params.id, { __v: 0 }, (err: any, education: any) => {
        if (err) {
            res.send(failResponse('Education not in database', { err }));
        } else {
            res.send(successResponse(
                'Education found',
                {
                    data: (education)
                }
            ));
        }
    });
}

export let updateEducation = async (req: Request, res: Response): Promise<void> => {
    console.log(req.body);
    let education = Education.findByIdAndUpdate(
        req.params.id,
        req.body,
        (err: any, education: any) => {
            if (err) {
                res.send(err);
            } else {
                res.send("Education info updated!");
            }
        }
    );
}

export let deleteEducation = async (req: Request, res: Response): Promise<void> => {
    let education = Education.deleteOne({ _id: req.params.id }, (err: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send("Successfully deleted education");
        }
    });
}