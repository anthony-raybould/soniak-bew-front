import { deliveryEmployee} from "../model/deliveryEmployee";

import axios from 'axios'

export const createDeliveryEmployee = async function(deliveryEmployee: deliveryEmployee): Promise<number>{
    try{
        const response = await axios.post('http://localhost:8080/api/deliveryemployee/', deliveryEmployee)

        return response.data
    }catch(e){
        throw new Error('Could not create delivery employee')
    }
}

export const getDeliveryEmployees = async function(): Promise<deliveryEmployee[]>{
    try{
        const response = await axios.get('http://localhost:8080/api/deliveryemployee')

        return response.data
    }catch(e){
        throw new Error('Could not get delivery employees')
    }
}

export const getDeliveryEmployeeByID = async function(id:number): Promise<deliveryEmployee>{
    try{
        const response = await axios.get('http://localhost:8080/api/deliveryemployee/' + id)

        return response.data
    } catch(e){
        throw new Error('Could not get delivery employee')
    }
}

export const deleteDeliveryEmployee = async function(id:number): Promise<void>{
    try{
        const response = await axios.delete('http://localhost:8080/api/deliveryemployee/' + id)
        console.log(response.data); // Log the response data for debugging

    }catch(e){
        throw new Error('Could not delete delivery employee')
    }
}