const { ObjectId } = require("mongodb");

class UserService {
    constructor(client) {
        this.User = client.db().collection("users");
    }

    extractUserData(payload){
        const user = {
            fullname: payload.fullname,
            username: payload.username,
            password: payload.password,
            address: payload.address,
            phone: payload.phone,
            date: payload.date,
            phai: payload.phai,
        };

        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        );
        return user;
    }

    async create(payload) {
        const user = this.extractUserData(payload);
        const result = await this.User.findOneAndUpdate(
            user,
            { $set: {}},
            {returnDocument: "after", upsert: true}
        );
        return result;
    }

    async find(filter){
        const cursor = await this.User.find(filter);
        return await cursor.toArray();
    }

    async count(filter){
        const cursor = await this.User.find(filter).count();
        return await cursor;
    }

    async findByName(username){
        return await this.find({
            username: {$regex: new RegExp(username), $options: "i"},
        });
    }

    async findById(id){
        return await this.User.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload){
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractUserData(payload);
        const result  = await this.User.findOneAndUpdate(
            filter,
            { $set: update},
            { returnDocument: "after"}
        );
        return result;
    }

    async delete(id) {
        const result = await this.User.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll(){
        const result = await this.User.deleteMany({});
        return result.deletedCount;
    }

    async findUser(Username, Password){
        return await this.User.findOne({
            username: Username,
            password: Password,
        });
    }
}

module.exports = UserService;
