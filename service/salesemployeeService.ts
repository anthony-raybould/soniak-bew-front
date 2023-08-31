import { SalesEmployee } from "../model/salesemployee";
import axios from 'axios'



export const getSalesEmployees = async function (): Promise<SalesEmployee[]> {
    try {
        const response = await axios.get('http://localhost:8080/api/salesemployee')
        return response.data
    } catch (e) {
        throw new Error('Could not get products')
    }
}
