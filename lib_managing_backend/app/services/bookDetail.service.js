const { ObjectId } = require("mongodb");

class BookDetailService {
    constructor(client) {
        this.BookDetail = client.db().collection("bookDetail");
    }

    extractBookDetailData(payload){
        const bookDetail = {
            _id: payload._id,
            book_id: payload.book_id,
        };

        Object.keys(bookDetail).forEach(
            (key) => bookDetail[key] === undefined && delete bookDetail[key] //dọn dữ liệu của detail
        );
        return bookDetail;
    }

    async create(payload) {
        const bookDetail = this.extractBookDetailData(payload);
        const result = await this.BookDetail.findOneAndUpdate(
            bookDetail,
            { $set: {available: true, borrowCount: 0}},
            {returnDocument: "after", upsert: true}
        );
        return result;
    }
    
    //Tăng số lượng borrow
    async incBorrow(id, username){
        await this.BookDetail.updateOne(
            {_id: new ObjectId(id)}, 
            { $inc: 
                {
                    borrowCount: 1,
                },
            $set: 
                {
                    username: username,
                    available: false,
                },
            },
            );
        return null;
    }

    async returnBorrow(id){
        await this.BookDetail.updateOne(
            {_id: new ObjectId(id)},
            { 
                $set: 
                {
                    username: "",
                    available: true,
                }
            }
        )
    }

    async find(filter){
        const cursor = await this.BookDetail.find(filter);
        return await cursor.toArray();
    }

    async delete(id) {
        const result = await this.BookDetail.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
}

module.exports = BookDetailService;