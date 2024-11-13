import createApiClient from "./api.service";

class UserService {
    constructor (baseUrl = "/api/users") {
        this.api = createApiClient(baseUrl);
    }

    async getAll(){
        return (await this.api.get("/")).data;
    }

    async getOneUsername(username){
        return (await this.api.get("/?username="+username)).data;
    }

    async create(data){
        return (await this.api.post("/", {
            fullname: data.fullname,
            username: data.username,
            password: data.password,
            address: data.address,
            phone: data.phone,
            birthday: data.birthday,
            phai: data.phai
        })).data;
    }
    async deleteAll(){
        return (await this.api.delete("/")).data;
    }
    async get(id){
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data){
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id){
        return (await this.api.delete(`/${id}`)).data;
    }

    async login(username, password){
        return (await this.api.post(`/login`, {
            username: username,
            password: password,
        })).data
    }
}

export default new UserService();
