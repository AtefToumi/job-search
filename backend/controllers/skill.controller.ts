import { Request, Response } from 'express'
import { successResponse, failResponse } from '../helpers/methods'
import Skill from '../models/skill.model'

//lists all skills
export const skills = async (req: Request, res: Response): Promise<void> => {
    Skill.find({}, { __v: 0 }, function (err: any, result: any) {
      if (err) {
        res.send(failResponse('error', {}))
      } else {
        res.send(successResponse(
          'list of skills',
          {
            data: (result)
          }
        ))
      }
    });
  
  }

  //add skill
  export const addSkill = async (req: Request, res: Response): Promise<void> => {
    console.log(req.body)
    const skill = new Skill({
      title: req.body.title,
      skillLevel: req.body.skillLevel,
    });
  
    skill.save((err: any) => {
      if (err) {
        res.send(failResponse('error', { message: err.message }))
      } else {
        res.send(successResponse(
          'Skill created successfully!',
          {
            data: (skill)
          }
        ))
      }
    });
  }

  export const getSkill = async (req: Request, res: Response): Promise<void> => {
    Skill.findById(req.params.id, { __v: 0 }, (err: any, skill: any) => {
      if (err) {
        res.send(failResponse('Skill not in database', { err }));
      } else {
        res.send(successResponse(
          'Skill found',
          {
            data: (skill)
          }
        ));
      }
    });
  }

export let updateSkill = async (req: Request, res: Response): Promise<void> => {
    console.log(req.body);
    let skill = Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      (err: any, skill: any) => {
        if (err) {
          res.send(err);
        } else {
          res.send("Skill info updated!");
        }
      }
    );
  }

export let deleteSkill = async (req: Request, res: Response): Promise<void> => {
    let skill = Skill.deleteOne({ _id: req.params.id }, (err: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully deleted skill");
      }
    });
  }