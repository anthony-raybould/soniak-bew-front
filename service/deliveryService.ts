import { deliveryEmployee } from "../model/deliveryEmployee";

import axios from 'axios'

export const createDeliveryEmployee = async function(deliveryEmployee: deliveryEmployee): Promise<number>{
    try{
        const response = await axios.post('http://localhost:8080/api/deliveryemployee/', deliveryEmployee)

        return response.data
    }catch(e){
        throw new Error('Could not create delivery employee')
    }
}
