const ApiError = require("../api-error");

const PublisherService = require("../services/publisher.service");

const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    try {
        const publisherService = new PublisherService(MongoDB.client);
        const document = await publisherService.create(req.body);
        return res.send(document);
    } catch (err) {
        return next(new ApiError(500, "Lỗi xảy ra khi tạo NXB"));
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const publisherService = new PublisherService(MongoDB.client);
        const documents = await publisherService.findAll();
        return res.send(documents);
    } catch (err) {
        return next(new ApiError(500, "Lỗi xảy ra khi truy xuất danh sách NXB"));
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const publisherService = new PublisherService(MongoDB.client);
        const document = await publisherService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy NXB"));
        }
        return res.send(document);
    } catch (err) {
        return next(new ApiError(500, `Lỗi khi truy xuất NXB có id=${req.params.id}`));
    }
};

exports.searchByName = async (req, res, next) => {
    try {
        const publisherService = new PublisherService(MongoDB.client);
        const document = await publisherService.findByName(req.query.name);

        if (!document || document.length === 0) {
            return next(new ApiError(404, "Không tìm thấy NXB"));
        }
        return res.send(document);
    } catch (err) {
        return next(new ApiError(500, "Lỗi khi tìm kiếm NXB"));
    }
};

exports.update = async (req, res, next) => {
    try {
        const publisherService = new PublisherService(MongoDB.client);
        const document = await publisherService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy NXB"));
        }
        return res.send({ message: "Cập nhật thông tin NXB thành công" });
    } catch (err) {
        return next(new ApiError(500, `Lỗi khi cập nhật NXB có id=${req.params.id}`));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const publisherService = new PublisherService(MongoDB.client);
        const document = await publisherService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy NXB"));
        }
        return res.send({ message: "Xóa NXB thành công" });
    } catch (err) {
        return next(new ApiError(500, `Lỗi khi xóa NXB có id=${req.params.id}`));
    }
};
