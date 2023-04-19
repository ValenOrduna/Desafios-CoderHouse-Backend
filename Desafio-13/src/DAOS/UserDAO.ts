interface User {
    id:string,
    username: string,
    email: string,
    age: number,
    address: string,
    phone: string,
    avatar: string,
    password: string,
    idCart: string,
  }

class UserDAO {
    private readonly filePath: string;
  
    constructor(filepath: string) {
      this.filePath = filepath;
    }

    generateUniqueId(): string {
        const timestamp = new Date().getTime().toString(16);
        const random = Math.floor(Math.random() * 1000000000).toString(16);
        return `${timestamp}-${random}`;
      }
  
    async findAll(): Promise<User[]> {
        try {
          const data = await Deno.readTextFile(this.filePath);
          const users: User[] = JSON.parse(data);
          return users;
        } catch (err) {
          console.error(err);
          return [];
        }
      }
    
      async findById(id: string): Promise<User | undefined> {
        try {
          const users = await this.findAll();
          const userFind = users.find((user) => user.id === id);
          if (!userFind){
            return {status:404,error:'Usuario no encontrado '}
            }
          return {succes:'Usuario encontrado con exito',user:userFind}
        } catch (err) {
          console.error(err);
          return undefined;
        }
      }
    
      async create(user: User): Promise<void> {
        try {
            user.id = this.generateUniqueId()
          const users = await this.findAll();
          users.push(user);
          await Deno.writeTextFile(this.filePath, JSON.stringify(users));
          return {succes:'Usuario creado con exito',user:user}
        } catch (err) {
        return {status:402,error:'No se pudo crear el usuario'}
        }
      }
    
      async update(user: User,id: number): Promise<void> {
        try {
          const users = await this.findAll();
          const index = users.findIndex((u) => u.id === id);
          if (index !== -1) {
            user.id = id
            users[index] = user;
            await Deno.writeTextFile(this.filePath, JSON.stringify(users));
            return {succes:'Usuario actualizado con exito',user:user}
          }
          return {status:404,error:'Usuario no encontrado'}
        } catch (err) {
        return {status:404,error:'Usuario no se pudo actualizar'}
        }
      }
    
      async delete(id: string): Promise<void> {
        try {
          const users = await this.findAll();
          const index = users.findIndex((user) => user.id === id);
          if (index !== -1) {
            users.splice(index, 1);
            await Deno.writeTextFile(this.filePath, JSON.stringify(users));
            return {succes:'Usuario eliminado con exito',idUser:id}
            }
            return {status:404,error:'Usuario no encontrado'}
        } catch (err) {
          console.error(err);
        }
      }

    }
  

export const UserDAOManager = new UserDAO('users.json')

