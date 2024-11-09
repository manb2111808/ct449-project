import createApiClient from "./api.service";

class StaffService {
    constructor (baseUrl = "/api/staffs") {
        this.api = createApiClient(baseUrl);
    }

    async getAll(){
        return (await this.api.get("/")).data;
    }

    async count(){
        return (await this.api.put("/count")).data;
    }

    async getOneUsername(username){
        return (await this.api.get("/?username="+username)).data;
    }

    async create(data){
        return (await this.api.post("/", {
            username: data.username,
            password: data.password,
            address: data.address,
            phone: data.phone,
            role: data.role,
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

export default new StaffService();
