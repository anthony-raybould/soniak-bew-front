import { deliveryEmployee } from "../model/deliveryEmployee";

import axios from 'axios';

const handleFailedRequest = function (e: any) {
    if (e.response.status === 401 || e.response.status === 403) {
        throw new Error('You are not authorized to perform this action');
    }
}

export const createDeliveryEmployee = async function (deliveryEmployee: deliveryEmployee, token: string): Promise<number> {
    try {
        const response = await axios.post('http://localhost:8080/api/deliveryemployee/', deliveryEmployee, { params: { token: token } });

        return response.data;
    } catch (e) {
        handleFailedRequest(e);
        
        throw new Error('Could not create delivery employee');
    }
}

export const getDeliveryEmployees = async function (token: string): Promise<deliveryEmployee[]> {
    try {
        const response = await axios.get('http://localhost:8080/api/deliveryemployee', { params: { token: token } });

        return response.data;
    } catch (e) {
        handleFailedRequest(e);

        throw new Error('Could not get delivery employees')
    }
}

export const getDeliveryEmployeeByID = async function (id: number, token: string): Promise<deliveryEmployee> {
    try {
        const response = await axios.get('http://localhost:8080/api/deliveryemployee/' + id, { params: { token: token } });

        return response.data;
    } catch (e) {
        handleFailedRequest(e);

        throw new Error('Could not get delivery employee');
    }
}
