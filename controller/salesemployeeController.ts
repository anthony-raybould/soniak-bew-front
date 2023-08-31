import { Application, Request, Response } from "express";
import { SalesEmployee } from "../model/salesemployee"; 
import { createSalesEmployee, getSalesEmployees } from "../service/salesemployeeService";
import { getSalesEmployeeById } from "../service/salesemployeeService";

const salesemployeeService = require('../service/salesemployeeService')


export const salesemployeeController = (app: Application) => {

    app.get('/list-salesemployees', async (req: Request, res: Response) => {
        let data: SalesEmployee[]

        try {
            data = await getSalesEmployees(req.session.current?.token)
        } catch (e) {
            console.error(e);
        }

        res.render('list-salesemployees', { salesemployees: data })
    })

    app.get('/view-salesemployee/:id', async (req: Request, res: Response) => {
        let data: SalesEmployee

        try {
            const id: number = parseInt(req.params.id)
            data = await getSalesEmployeeById(id, req.session.current?.token) 
        } catch (e) {
            console.error(e);
        }

        res.render('view-salesemployee', {salesemployee: data})
    })


    app.get('/add-salesemployee-name-salary', async (req: Request, res: Response) => {
        if (!req.session.salesemployee) {
            req.session.salesemployee = {}
        }

        res.render('add-salesemployee-name-salary')
    })

    app.post('/add-salesemployee-name-salary', async (req: Request, res: Response) => {
        req.session.salesemployee["name"] = req.body.name
        req.session.salesemployee["salary"] = req.body.salary

        res.redirect('/add-salesemployee-bnumber-ninumber-comrate')
    })

    app.get('/add-salesemployee-bnumber-ninumber-comrate', async (req: Request, res: Response) => {
        res.render('add-salesemployee-bnumber-ninumber-comrate')
    })

    app.post('/add-salesemployee-bnumber-ninumber-comrate', async (req: Request, res: Response) => {
        req.session.salesemployee["bankAccountNumber"] = req.body.bankAccountNumber
        req.session.salesemployee["niNumber"] = req.body.niNumber
        req.session.salesemployee["commissionRate"] = req.body.commissionRate

        res.redirect('/add-salesemployee-confirmation')
   }) 


    app.get('/add-salesemployee-confirmation', async (req: Request, res: Response) => {
    res.render('add-salesemployee-confirmation', req.session.salesemployee)
    })

    app.post('/add-salesemployee-confirmation', async (req: Request, res: Response) => {
        let data: SalesEmployee = req.session.salesemployee
        let id: Number

        try {
            id = await createSalesEmployee(data, req.session.current?.token)

            req.session.salesemployee = undefined
            res.redirect('/view-salesemployee/' + id) 
        } catch (e) {
            console.error(e);
            res.locals.errormessage = e.message
            res.render('add-salesemployee-confirmation', req.session.salesemployee)
        }
   })


} 