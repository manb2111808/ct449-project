const { ObjectId } = require("mongodb");

class PublisherService {
    constructor(client) {
        this.Publisher = client.db().collection("publisher");
    }

    extractPublisherData(payload) {
        const publisher = {
            name: payload.name,
            address: payload.address,
        };

        // Remove undefined fields
        Object.keys(publisher).forEach(
            (key) => publisher[key] === undefined && delete publisher[key]
        );

        return publisher;
    }

    async create(payload) {
        const publisher = this.extractPublisherData(payload);
        const result = await this.Publisher.findOneAndUpdate(
            { name: publisher.name }, // Use the name as a unique identifier
            { $set: publisher },
            { returnDocument: "after", upsert: true }

        );
        return result.value;
    }

    async findAll() {
        const cursor = await this.Publisher.find({});
        return cursor.toArray();
    }

    async findById(id) {
        return await this.Publisher.findOne({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null });
    }

    // async findByName(name) {
    //     return await this.Publisher.find({
    //         name: { $regex: new RegExp(name, "i") }
    //     }).toArray();
    // }

    async findByName(name) {
        return await this.Publisher.find({ name: name }).toArray();
    }

    // async findByName(name) {
    //     return await this.Publisher.findOne({ name: name });
    // }

    async update(id, payload) {
        const publisher = this.extractPublisherData(payload);
        const result = await this.Publisher.findOneAndUpdate(
            { _id: ObjectId.isValid(id) ? new ObjectId(id) : null },
            { $set: publisher },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Publisher.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }
}

module.exports = PublisherService;