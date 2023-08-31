import axios from "axios";
import { Project } from "../model/project";

export const getProjects =  async function() : Promise<Project[]> {

    try {
        const response = await axios.get("http://localhost:8080/api/project");

        return response.data;

    } catch (e) {
        throw new Error("Could not get projects.");
    }
}

export const getProjectById = async function(projectId : number) : Promise<Project> {

    try {
        const response = await axios.get(`http://localhost:8080/api/project/${projectId}`);

        return response.data;

    } catch (e) {
        console.error(e);
        throw new Error("Could not get project.");
    }
}

export const updateProject = async function (project : Project) : Promise<number> {

    try {
        const response = await axios.post("http://localhost:8080/api/project/", project);
        return response.data;

    } catch (e) {
        console.error(e);
        throw new Error("Could not update project.");
    }
}