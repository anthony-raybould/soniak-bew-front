import { ActiveSession, Credentials, User } from "../model/auth";

import axios from 'axios'

export const login = async function(credentials: Credentials): Promise<ActiveSession> {
    try {
        const response = await axios.post('http://localhost:8080/api/login/', credentials);

        return response.data;
    } catch (e) {
        if (e.response.status === 401) {
            throw new Error('Your username or password combination is incorrect');
        }

        throw new Error('Could not login');
    }
}

export const register = async function(user: User): Promise<void> {
    try {
        await axios.post('http://localhost:8080/api/register/', user);
    } catch (e) {
        throw new Error('Failed to register');
    }
}
