import { deliveryEmployee } from "../model/deliveryEmployee";

const axios = require('axios');

module.exports.createDeliveryEmployee = async function(deliveryEmployee: deliveryEmployee): Promise<number>{
    try{
        const response = await axios.post('http://localhost:8080/api/deliveryemployee/', deliveryEmployee)

        return response.data
    }catch(e){
        throw new Error('Could not create delivery employee')
    }
}
