interface Product {
    id: string,
    image: string,
    title: string,
    description: string,
    stock: number,
    price: number,
  }
  
  class ProductDAO {
    private readonly filePath: string;
  
    constructor(filePath: string) {
      this.filePath = filePath;
    }
  
    generateUniqueId(): string {
      const timestamp = new Date().getTime().toString(16);
      const random = Math.floor(Math.random() * 1000000000).toString(16);
      return `${timestamp}-${random}`;
    }
  
    async findAll(): Promise<Product[]> {
      try {
        const data = await Deno.readTextFile(this.filePath);
        const products: Product[] = JSON.parse(data);
        return products;
      } catch (err) {
        console.error(err);
        return [];
      }
    }
  
    async findById(id: string): Promise<Product | undefined> {
      try {
        const products = await this.findAll();
        const product = products.find((p) => p.id === id);
        if (!product) {
          return { status: 404, error: 'Producto no encontrado' };
        }
        return { success: 'Producto encontrado con éxito', product };
      } catch (err) {
        console.error(err);
        return undefined;
      }
    }
  
    async create(product: Product): Promise<void> {
      try {
        product.id = this.generateUniqueId();
        const products = await this.findAll();
        products.push(product);
        await Deno.writeTextFile(this.filePath, JSON.stringify(products));
        return { success: 'Producto creado con éxito', product };
      } catch (err) {
        console.error(err);
        return { status: 402, error: 'No se pudo crear el producto' };
      }
    }
  
    async update(product: Product, id: string): Promise<void> {
      try {
        const products = await this.findAll();
        const index = products.findIndex((p) => p.id === id);
        if (index !== -1) {
          product.id = id;
          products[index] = product;
          await Deno.writeTextFile(this.filePath, JSON.stringify(products));
          return { success: 'Producto actualizado con éxito', product };
        }
        return { status: 404, error: 'Producto no encontrado' };
      } catch (err) {
        console.error(err);
        return { status: 404, error: 'Producto no se pudo actualizar' };
      }
    }
  
    async delete(id: string): Promise<void> {
      try {
        const products = await this.findAll();
        const index = products.findIndex((p) => p.id === id);
        if (index !== -1) {
          products.splice(index, 1);
          await Deno.writeTextFile(this.filePath, JSON.stringify(products));
          return { success: 'Producto eliminado con éxito', idProduct: id };
        }
        return { status: 404, error: 'Producto no encontrado' };
      } catch (err) {
        console.error(err);
      }
    }
  }
  
  export const ProductDAOManager = new ProductDAO('products.json');
  