import { Application, Request, Response } from "express";
import { SalesEmployee } from "../model/salesemployee"; 
import { getSalesEmployees } from "../service/salesemployeeService";

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
} 