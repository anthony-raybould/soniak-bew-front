import { SalesEmployee } from "../model/salesemployee";

const axios = require('axios');


module.exports.getSalesEmployees = async function (): Promise<SalesEmployee[]> {
    try {
        const response = await axios.get('http://localhost:8080/api/salesemployee')
        return response.data
    } catch (e) {
        throw new Error('Could not get products')
    }
}
