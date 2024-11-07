import createApiClient from "./api.service";

class BookService {
    constructor (baseUrl = "/api/books") {
        this.api = createApiClient(baseUrl);
    }

    async getAll(){
        return (await this.api.get("/")).data;
    }
    async add(data){
        return (await this.api.post("/", data)).data;
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
    // async count(){
    //     return (await this.api.get("/count")).data;
    // }
    // async countGenre(genre){
    //     return (await this.api.get(`/count/${genre}`)).data;
    // }
    async addDetail(id){
        return (await this.api.get(`/add/${id}`)).data;
    }
}

export default new BookService();