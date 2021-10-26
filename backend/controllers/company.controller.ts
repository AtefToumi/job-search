import { Request, Response } from 'express'
import { copyFile } from 'fs'
import { successResponse, failResponse } from '../helpers/methods'
import Company from '../models/company.model'

export const companies = async (req: Request, res: Response): Promise<void> => {
  Company.find({}, { _id: 0, __v: 0 }, function (err: any, result: any) {
    if (err) {
      res.send(failResponse('error', {}))
    } else {
      res.send(successResponse(
        'list of companies',
        {
          data: (result)
        }
      ))
    }
  });
}

export const getCompany = async (req: Request, res: Response): Promise<void> => {
  Company.findById(req.params.id, { __v: 0 }, (err: any, company: any) => {
    if (err) {
      res.send(failResponse('Company not found', { err }));
    } else {
      res.send(successResponse(
        'Company found',
        {
          data: (company)
        }
      ));
    }
  });
}

export const addCompany = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body)
  const company = new Company({
      name: req.body.name,
      description: req.body.description,
      
  });

  company.save((err: any) => {
      if (err) {
          res.send(failResponse('error', { message: err.message }))
      } else {
          res.send(successResponse(
              'Company added!',
              {
                  data: (company)
              }
          ))
      }
  });
}


export let updateCompany = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body);
  let company = Company.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err: any, company: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully updated company!");
      }
    }
  );
}

export let deleteCompany = async (req: Request, res: Response): Promise<void> => {
  let company = Company.deleteOne({ _id: req.params.id }, (err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Successfully deleted Company");
    }
  });
}