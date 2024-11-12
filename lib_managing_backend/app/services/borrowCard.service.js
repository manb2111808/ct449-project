const { ObjectId } = require("mongodb");

class BorrowCardService {
    constructor(client) {
        this.BorrowCards = client.db().collection("borrowCards");
    }

    extractBorrowData(payload) {
        const borrowCard = {
            _id: payload.bookDetailId,
            bookName: payload.bookName,
            username: payload.username,
            borrowDate: payload.borrowDate,
            dueDate: payload.dueDate,
        };

        Object.keys(borrowCard).forEach(
            (key) => borrowCard[key] === undefined && delete borrowCard[key]
        );
        return borrowCard;
    }

    async create(payload) {
        const borrowCard = this.extractBorrowData(payload);
        const result = await this.BorrowCards.insertOne(borrowCard);
        return result;
    }

    async find(filter) {
        const cursor = await this.BorrowCards.find(filter);
        return await cursor.toArray();
    }

    // async findById(id) {
    //     return await this.BorrowCards.findOne({
    //         _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    //     });
    // }

    async findById(id) {
    // Remove ObjectId conversion since your IDs are strings
        return await this.BorrowCards.findOne({ _id: id });
    }

    async update(id, payload) {
        const filter = { _id: id }; // Use string comparison for the ID
        const update = this.extractBorrowData(payload);
        const result = await this.BorrowCards.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    // async delete(id) {
    //     const result = await this.BorrowCards.findOneAndDelete({ _id: id }); // Use string comparison for the ID
    //     return result.value;
    // }

    async delete(id) {
    // Check if the document exists first
    const document = await this.findById(id);
    if (!document) return null; // Document not found

    // If found, proceed with deletion
    const result = await this.BorrowCards.deleteOne({ _id: id });
    return result.deletedCount > 0 ? document : null; // Return the original document if deleted
}

    async deleteAll() {
        const result = await this.BorrowCards.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = BorrowCardService;