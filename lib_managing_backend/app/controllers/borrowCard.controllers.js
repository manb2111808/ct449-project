const ApiError = require("../api-error");
const BorrowCardService = require("../services/borrowCard.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    if (!req.body?.username) {
        return next(new ApiError(400, "Username cannot be empty"));
    }

    try {
        const borrowCardService = new BorrowCardService(MongoDB.client);
        const document = await borrowCardService.create(req.body);
        return res.send(document);
    } catch (err) {
        return next(new ApiError(500, "Error creating borrow card"));
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const borrowCardService = new BorrowCardService(MongoDB.client);
        const documents = await borrowCardService.find({});
        return res.send(documents);
    } catch (err) {
        return next(new ApiError(500, "Error fetching borrow cards"));
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const borrowCardService = new BorrowCardService(MongoDB.client);
        const document = await borrowCardService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Borrow card not found"));
        }
        return res.send(document);
    } catch (err) {
        return next(new ApiError(500, `Error fetching borrow card with id=${req.params.id}`));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const borrowCardService = new BorrowCardService(MongoDB.client);
        const document = await borrowCardService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Borrow card not found"));
        }
        return res.send({ message: "Borrow card deleted successfully" });
    } catch (err) {
        return next(new ApiError(500, `Error deleting borrow card with id=${req.params.id}`));
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const borrowCardService = new BorrowCardService(MongoDB.client);
        const deletedCount = await borrowCardService.deleteAll();
        return res.send({
            message: `${deletedCount} borrow cards deleted successfully`,
        });
    } catch (err) {
        return next(new ApiError(500, "Error deleting all borrow cards"));
    }
};