import { SalesEmployee } from "../model/salesemployee";
import axios from 'axios'

import {validateSalesEmployee} from "../validator/salesemployeeValidator";


export const getSalesEmployees = async function (token:string): Promise<SalesEmployee[]> {
    try {
        const response = await axios.get('http://localhost:8080/api/salesemployee', {params:{token:token}})
        return response.data
    } catch (e) {
        throw new Error('Could not get sales employees')
    }
}

export const getSalesEmployeeById = async function (id: number, token:string): Promise<SalesEmployee> {
    try {
        const response = await axios.get('http://localhost:8080/api/salesemployee/' + id, {params: {token: token}})
        return response.data
    } catch (e) {
        throw new Error('Could not get sales employee')
    }

}

export const createSalesEmployee = async function(salesEmployee: SalesEmployee, token:string): Promise<number>{
    const error: string = validateSalesEmployee(salesEmployee)

    if (error) {
        throw new Error(error)
    }

    try{
        const response = await axios.post('http://localhost:8080/api/salesemployee', salesEmployee, {params: {token:token}})

        return response.data
    }catch(e){
        throw new Error('Could not create sales employee')
    }
}
