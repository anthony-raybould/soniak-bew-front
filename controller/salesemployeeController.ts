import { Application, Request, Response } from "express";
import { SalesEmployee } from "../model/salesemployee"; 
import { getSalesEmployees } from "../service/salesemployeeService";
import { getSalesEmployeeById } from "../service/salesemployeeService";

const salesemployeeService = require('../service/salesemployeeService')


export const salesemployeeController = (app: Application) => {

    app.get('/list-salesemployees', async (req: Request, res: Response) => {
        let data: SalesEmployee[]

        try {
            data = await getSalesEmployees()
        } catch (e) {
            console.error(e);
        }

        res.render('list-salesemployees', { salesemployees: data })
    })

    app.get('/view-salesemployee/:id', async (req: Request, res: Response) => {
        let data: SalesEmployee

        try {
            const id: number = parseInt(req.params.id)
            data = await getSalesEmployeeById(id) 
        } catch (e) {
            console.error(e);
        }

        res.render('view-salesemployee', {salesemployee: data})
    })
} 