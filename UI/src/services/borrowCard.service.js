import createApiClient from "./api.service";

class BorrowCardService {
    constructor(baseUrl = "/api/borrowCards") {
        this.api = createApiClient(baseUrl);
    }

    async borrowBook(data) {
        return (await this.api.post("/", data)).data;
    }

    async getAll() {
        return (await this.api.get("/")).data;
    }

    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default new BorrowCardService();