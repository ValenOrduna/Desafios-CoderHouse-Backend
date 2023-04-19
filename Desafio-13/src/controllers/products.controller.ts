import { ProductDAOManager } from "../DAOS/ProductDAO.ts";

export const getProducts = async ({ response }) => {
  const products = await ProductDAOManager.findAll();
  response.body = products;
};

export const getProductById = async ({ params, response }) => {
  const product = await ProductDAOManager.findById(params.id);
  response.body = product;
};

export const createProduct = async ({ request, response }) => {
  const product = await request.body().value;
  const newProduct = await ProductDAOManager.create(product);
  response.body = newProduct;
};

export const updateProduct = async ({ request, response, params }) => {
  const product = await request.body().value;
  const updatedProduct = await ProductDAOManager.update(product, params.id);
  response.body = updatedProduct;
};

export const deleteProduct = async ({ params, response }) => {
  const deleteUser = await ProductDAOManager.delete(params.id);
  response.body = deleteUser;
};
