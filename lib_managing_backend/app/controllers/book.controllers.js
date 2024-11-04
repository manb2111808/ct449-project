const { ObjectId } = require("mongodb");
const ApiError = require("../api-error");

const BookService = require("../services/book.service");
const BookDetailService = require("../services/bookDetail.service");

const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    if(!req.body?.name) {
        return next (new ApiError(400, "Tên sách không thể rỗng"));
    }

    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.create(req.body);
        return res.send(document);
    } catch (err){
        return next (
            new ApiError(500, "Lỗi xảy ra khi create book")
        );
    }
}

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const bookService = new BookService(MongoDB.client);
        const {name} = req.query;
        if (name) {
            documents = await bookService.findByName(name);
        } else {
            documents = await bookService.find({});
        }
    } catch (error) {
        return next (
            new ApiError(500, "Xảy ra lỗi khi truy xuất danh mục sách")
        );
    }

    return res.send(documents);
}

exports.findOne = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy sách"));
        }
        return res.send(document);
    } catch (err) {
        return next (
            new ApiError(
                500,
                `Lỗi không tìm thấy sách có id=${req.params.id}`
            )
        );
    }
};

exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Nhập liệu không thể rỗng"));
    }

    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.update(req.params.id, req.body);
        
        if(!document) {
            return next(new ApiError(404, "Không tìm thấy sách"));
        }
        return res.send({message: "Cập nhật thông tin thành công"});
    } catch (err) {
        return next(new ApiError(
            500,
            `Lỗi không cập nhật được sách có id=${req.params.id}`
            // `Lỗi khi cập nhật sách ${req.params.name}`
        ));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = bookService.delete(req.params.id);
        if (!document) {
            return next (new ApiError(404, "Không timg thấy sách"));
        }

        return res.send({message: "Xóa thành công"});
    } catch (err) {
        return next(
            new ApiError (
                500,
                `Lỗi không thể xóa sách có id=${req.params.id}`
                // `Lỗi không thể xóa sách ${req.params.name}`
            )
        )
    }
};

exports.deleteAll = async (req, res, next) => {
    try{
        const bookService = new BookService(MongoDB.client);
        const deletedCount = await bookService.deleteAll();
        return res.send({
            message: `${deletedCount} sách xóa thành công`,
        });
    } catch (err) {
        return next(new ApiError(
            500,
            `Lỗi khi xóa`
        ));
    }
};

exports.findAllAvailable = async (req, res, next) => {
    try{   
        const bookService = new BookService(MongoDB.client);
        const documents = await bookService.findAvailable(); 
        return res.send(documents);
    } catch (err) {
        return next(new ApiError(
            500,
            `Lỗi xảy ra khi tìm sách có thể mượn`
        ));
    }
};

// exports.countGenre = async (req, res, next) => {
//     try{   
//         let genre = req.params.genre;
//         const bookService = new BookService(MongoDB.client);
//         let count = await bookService.count({
//             genre: genre
//         }); 
//         return res.send(''+count);
//     } catch (err) {
//         return next(new ApiError(
//             500,
//             `Lỗi xảy ra khi tìm sách có thể mượn`
//         ));
//     }
// };

// exports.count = async (req, res, next) => {
//     try{   
//         const bookService = new BookService(MongoDB.client);
//         let Fantasy = await bookService.count({ genre: "Fantasy" }); 
//         let Scifi = await bookService.count({ genre: "Scifi" }); 
//         let Romance = await bookService.count({ genre: "Romance" }); 
//         let Horror = await bookService.count({ genre: "Horror" }); 
//         let Classic = await bookService.count({ genre: "Classic" }); 
//         let Document = await bookService.count({ genre: "Document" }); 
//         return res.send([
//             Fantasy,
//             Scifi,
//             Romance,
//             Horror,
//             Classic,
//             Document,
//         ]);
//     } catch (err) {
//         return next(new ApiError(
//             500,
//             `Lỗi xảy ra khi tìm sách có thể mượn`
//         ));
//     }
// };

//Thêm chi tiết sách 
exports.addDetail = async (req, res, next) => {
    // try{   
        const bookService = new BookService(MongoDB.client);
        let id = await bookService.updateDetail(req.params.id);
        await new BookDetailService(MongoDB.client).create(
            {
                _id: new ObjectId(id),
                book_id: new ObjectId(req.params.id),
            }
        );
        return res.send(id);
    // } catch (err) {
    //     return next(new ApiError(
    //         500,
    //         `Lỗi xảy ra khi tìm sách có thể mượn`
    //     ));
    // }
};



