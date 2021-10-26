import { Request, Response } from 'express'
import { successResponse, failResponse } from '../helpers/methods'
import Offer from '../models/offer.model'

//lists all offers
export const offers = async (req: Request, res: Response): Promise<void> => {
    Offer.find({}, { __v: 0 }, function (err: any, result: any) {
      if (err) {
        res.send(failResponse('error', {}))
      } else {
        res.send(successResponse(
          'list of offers',
          {
            data: (result)
          }
        ))
      }
    });
  
  }

  //add an offer
  export const addOffer = async (req: Request, res: Response): Promise<void> => {
    console.log(req.body)
    const offer = new Offer({
      title: req.body.title,
      company: req.body.company,
      description: req.body.description,
      contact: req.body.contact,
      requirements: req.body.requirements,
      type: req.body.type,
      salary: req.body.salary,
      location: req.body.location,
      status: req.body.status
    });
  
    offer.save((err: any) => {
      if (err) {
        res.send(failResponse('error', { message: err.message }))
      } else {
        res.send(successResponse(
          'Offer created successfully!',
          {
            data: (offer)
          }
        ))
      }
    });
  }

  export const getOffer = async (req: Request, res: Response): Promise<void> => {
    Offer.findById(req.params.id, { __v: 0 }, (err: any, offer: any) => {
      if (err) {
        res.send(failResponse('Offer not in database', { err }));
      } else {
        res.send(successResponse(
          'Offer found',
          {
            data: (offer)
          }
        ));
      }
    });
  }

export let updateOffer = async (req: Request, res: Response): Promise<void> => {
    console.log(req.body);
    let offer = Offer.findByIdAndUpdate(
      req.params.id,
      req.body,
      (err: any, offer: any) => {
        if (err) {
          res.send(err);
        } else {
          res.send("Offer info updated!");
        }
      }
    );
  }

export let deleteOffer = async (req: Request, res: Response): Promise<void> => {
    let offer = Offer.deleteOne({ _id: req.params.id }, (err: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully deleted offer");
      }
    });
  }