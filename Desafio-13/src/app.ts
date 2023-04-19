import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import routerUser from "./routers/users.routes.ts";
import routerProduct from "./routers/products.routes.ts";

const app = new Application();


app.use(routerUser.routes());
app.use(routerProduct.routes());

const PORT = 8080;

console.log(`Server running on port ${PORT}`);
await app.listen({ port: PORT });