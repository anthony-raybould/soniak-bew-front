import { SalesEmployee } from "../model/salesemployee";
import axios from 'axios'



export const getSalesEmployees = async function (): Promise<SalesEmployee[]> {
    try {
        const response = await axios.get('http://localhost:8080/api/salesemployee')
        return response.data
    } catch (e) {
        throw new Error('Could not get sales employees')
    }
}

export const getSalesEmployeeById = async function (id: number): Promise<SalesEmployee> {
    try {
        const response = await axios.get('http://localhost:8080/api/salesemployee/' + id)
        return response.data
    } catch (e) {
        throw new Error('Could not get sales employee')
    }

}
