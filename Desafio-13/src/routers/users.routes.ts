import { Router } from "https://deno.land/x/oak/mod.ts";
import { getUsers,getUserById,createUser,updateUser,deleteUser } from "../controllers/users.controller.ts";

const routerUser = new Router({prefix:'/users'});

routerUser.get("/", getUsers)
routerUser.get('/:id',  getUserById)

routerUser.post('/',createUser)

routerUser.put('/:id',updateUser)

routerUser.delete('/:id',deleteUser)

export default routerUser