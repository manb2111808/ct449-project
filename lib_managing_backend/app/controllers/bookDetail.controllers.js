const { ObjectId } = require("mongodb");
const ApiError = require("../api-error");

const BookService = require("../services/book.service");
const BookDetailService = require("../services/bookDetail.service");

const MongoDB = require("../utils/mongodb.util");

exports.borrow = async (req, res, next) => {
    try{   
        const bookDetailService = new BookDetailService(MongoDB.client);
        await bookDetailService.incBorrow(req.params.id, req.query.username);
    return res.send(null);
    } catch (err) {
        return next(new ApiError(
            500,
            "Lỗi khi cho mượn sách"
        ));
    }
};

exports.return = async (req, res, next) => {
    try{   
        const bookDetailService = new BookDetailService(MongoDB.client);
        await bookDetailService.returnBorrow(req.params.id);
        return res.send(null);
    } catch (err) {
        return next(new ApiError(
            500,
            "Lỗi khi hoàn trả sách"
        ));
    }
};

//Tìm chi tiết sách
exports.findDetail = async (req, res, next) => {
    try{   
        const bookDetailService = new BookDetailService(MongoDB.client);
        let document = await bookDetailService.find({
            book_id: new ObjectId(req.params.id),
        });
        return res.send(document);
    } catch (err) {
        return next(new ApiError(
            500,
            "Lỗi khi tìm sách để mượn"
        ));
    }
};

//Xóa chi tiết sách
exports.deleteDetail = async (req, res, next) => {
    try{   
        const bookDetailService = new BookDetailService(MongoDB.client);
        let document = await bookDetailService.delete(req.params.id);
        return res.send(document);
    } catch (err) {
        return next(new ApiError(
            500,
            `Lỗi khi xóa sách mượn`
        ));
    }
};

//Tìm sách đang mượn
exports.findBorrowed = async (req, res, next) => {
    // try{   
        const bookDetailService = new BookDetailService(MongoDB.client);
        let document = await bookDetailService.find({
            available: false,
        });
        return res.send(document);
    // } catch (err) {
    //     return next(new ApiError(
    //         500,
    //         `Lỗi xảy ra khi tìm sách có thể mượn`
    //     ));
    // }
};