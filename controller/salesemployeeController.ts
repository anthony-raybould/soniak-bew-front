import { Application, Request, Response } from "express";
import { SalesEmployee } from "../model/salesemployee"; 

const salesemployeeService = require('../service/salesemployeeService')


module.exports = function(app: Application){

    app.get('/list-salesemployees', async (req: Request, res: Response) => {
        let data: SalesEmployee[]

        try {
            data = await salesemployeeService.getSalesEmployees()
        } catch (e) {
            console.error(e);
        }

        res.render('list-salesemployees', { salesemployees: data })
    })
} 