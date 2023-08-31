import { Application, Request, Response } from "express"
import { deliveryEmployee } from "../model/deliveryEmployee"

const deliveryService = require('../service/deliveryService')

export const deliveryController = (app:Application) =>{
    app.get('/add-delivery-employee', async (req:Request, res: Response) => {
        res.render('add-delivery-employee')
    })

    app.post('/add-delivery-employee', async(req:Request, res:Response) => {
        let data: deliveryEmployee = req.body
        let id: Number

        try{
            id = await deliveryService.createDeliveryEmployee(data)
        }catch(e){
            console.error(e)

            res.locals.errormessage = e.message

            res.render('add-delivery-employee', req.body)
        }
    })
}