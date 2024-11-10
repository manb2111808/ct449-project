import createApiClient from "./api.service";

class BookDetailService {
    constructor (baseUrl = "/api/bookDetails") {
        this.api = createApiClient(baseUrl);
    }

    async getDetail(id){
        return (await this.api.get(`/${id}`)).data;
    }

    async getBorrow(){
        return (await this.api.put(`/borrowList`)).data;
    }

    async deleteDetail(id){
        (await this.api.delete(`/${id}`)).data;
    }

    async borrow(id, username){
        (await this.api.get(`/borrow/${id}?username=${username}`)).data;
    }

    async return(id){
        (await this.api.put(`/borrow/${id}`)).data;
    }
}

export default new BookDetailService();