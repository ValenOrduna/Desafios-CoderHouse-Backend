import { Router } from "https://deno.land/x/oak/mod.ts";
import { getProducts,getProductById,createProduct,updateProduct,deleteProduct } from "../controllers/products.controller.ts";

const routerProduct = new Router({prefix:'/products'});

routerProduct.get("/", getProducts)
routerProduct.get('/:id',  getProductById)

routerProduct.post('/',createProduct)

routerProduct.put('/:id',updateProduct)

routerProduct.delete('/:id',deleteProduct)

export default routerProduct