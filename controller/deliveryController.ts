import { Application, Request, Response } from "express"
import { deliveryEmployee } from "../model/deliveryEmployee"

import {createDeliveryEmployee, deleteDeliveryEmployee, getDeliveryEmployeeByID, getDeliveryEmployees} from "../service/deliveryService"

const validateAccess = function (req: Request, res: Response, next: Function) {
    if (req.session.current?.role === 'HR' || req.session.current?.role === 'SUPERUSER') {
        next();
    } else {
        res.redirect('/forbidden');
    }
};

export const deliveryController = (app:Application) =>{
    app.use('/add-delivery-employee', validateAccess);
    app.use('/list-delivery-employees', validateAccess);
    app.use('/view-delivery-employee', validateAccess);

    app.get('/add-delivery-employee', async (req:Request, res: Response) => {
        res.render('add-delivery-employee')
    })

    app.post('/add-delivery-employee', async(req:Request, res:Response) => {
        let data: deliveryEmployee = req.body
        let id: Number

        try{
            id = await createDeliveryEmployee(data, req.session.current?.token)
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
            data = await getDeliveryEmployees(req.session.current?.token);
        }catch(e){
            console.error(e);
            
            res.locals.errormessage = e.message;
        }
    
        res.render('list-delivery-employees', { deliveryemployees: data } )
    })

    app.get('/view-delivery-employee/:id', async (req: Request, res: Response) => {
        let data: deliveryEmployee

        try{

            const id: number = parseInt(req.params.id)
            data = await getDeliveryEmployeeByID(id, req.session.current?.token)
            console.log(data)
        }catch(e){
            console.error(e)
            
            res.locals.errormessage = e.message;
        }

        res.render('view-delivery-employee', {deliveryEmployee: data })
    })

    app.get('/delete-delivery-employee', async (req:Request, res: Response) => {
        let data: deliveryEmployee[]

        try{
            const id = parseInt(req.params.id)
            data = await getDeliveryEmployees(req.session.current?.token);
        }catch(e){
            console.error(e);
        }
        res.render('delete-delivery-employee', { deliveryemployees: data })
    })

    app.post('/delete-delivery-employee', async(req:Request, res:Response) => {
        const id: number = parseInt(req.params.id, 10);

        try{
            await deleteDeliveryEmployee(id);

            res.redirect('/delete-delivery-employee/')

        }catch(e){
            console.error(e)
        }
    })
}