import { UserDAOManager } from "../DAOS/UserDAO.ts";

export const getUsers = async ({ response }) => {
    const users = await UserDAOManager.findAll()
    response.body = users
};

export const getUserById =  async ({request, response,params }) => {
    const userFind = await UserDAOManager.findById(params.id)
    response.body = userFind;
}

export const createUser = async ({ request,response }) =>{
    const body = await request.body().value
    const newUser = await UserDAOManager.create(body)
    response.body = newUser;
}

export const updateUser = async ({ request,response,params }) => {
    const user = await request.body().value
    const updateUser = await UserDAOManager.update(user,params.id)
    response.body = updateUser
}

export const deleteUser = async ({ request,response,params }) =>{
    const deleteUser = await UserDAOManager.delete(params.id)
    response.body = deleteUser
}