import { Application, Request, Response } from "express"
import { deliveryEmployee } from "../model/deliveryEmployee"

import {createDeliveryEmployee, getDeliveryEmployeeByID, getDeliveryEmployees} from "../service/deliveryService"

export const deliveryController = (app:Application) =>{
    app.get('/add-delivery-employee', async (req:Request, res: Response) => {
        res.render('add-delivery-employee')
    })

    app.post('/add-delivery-employee', async(req:Request, res:Response) => {
        let data: deliveryEmployee = req.body
        let id: Number

        try{
            id = await createDeliveryEmployee(data)
            res.redirect('/view-delivery-employee/' + id)
        }catch(e){
            console.error(e)

            res.locals.errormessage = e.message

            res.render('add-delivery-employee', req.body)
        }
    })

    app.get('/list-delivery-employees', async (req: Request, res: Response) => {
        let data: deliveryEmployee[]

        try{
            data = await getDeliveryEmployees();
        }catch(e){
            console.error(e);
        }
    
        res.render('list-delivery-employees', { deliveryemployees: data } )
    })

    app.get('/view-delivery-employee/:id', async (req: Request, res: Response) => {
        let data: deliveryEmployee

        try{
            const id: number = parseInt(req.params.id)
            data = await getDeliveryEmployeeByID(id)

            console.log(data)
        }catch(e){
            console.error(e)
        }

        res.render('view-delivery-employee', {deliveryEmployee: data })
    })
}