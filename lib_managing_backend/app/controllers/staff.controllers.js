const ApiError = require("../api-error");
const StaffService = require("../services/staff.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    if (!req.body?.username) {
        return next(new ApiError(400, "Tên nhân viên không thể trống"));
    }

    try {
        const staffService = new StaffService(MongoDB.client);
        const document = await staffService.create(req.body);
        return res.send(document);
    } catch (err) {
        return next(
            new ApiError(500, "Lỗi xảy ra khi tạo admin")
        );
    }
}

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const staffService = new StaffService(MongoDB.client);
        const { username } = req.query;
        if (username) {
            documents = await staffService.findByName(username);
        } else {
            documents = await staffService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi khi lấy thông tin admin")
        );
    }

    return res.send(documents);
}

exports.findOne = async (req, res, next) => {
    try {
        const staffService = new StaffService(MongoDB.client);
        const document = await staffService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy tài khoản"));
        }
        return res.send(document);
    } catch (err) {
        return next(
            new ApiError(
                500,
                `Lỗi không tìm thấy tài khoản có id=${req.params.id}`
            )
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Nhập liệu không thể rỗng"));
    }

    try {
        const staffService = new StaffService(MongoDB.client);
        const document = await staffService.update(req.params.id, req.body);

        if (!document) {
            return next(new ApiError(404, "Không tìm thấy tài khoản"));
        }
        return res.send({ message: "Cập nhật thông tin thành công" });
    } catch (err) {
        return next(new ApiError(
            500,
            `Lỗi không cập nhật được tài khoản có id=${req.params.id}`
        ));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const staffService = new StaffService(MongoDB.client);
        const document = staffService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy tài khoản"));
        }

        return res.send({ message: "Xóa thành công" });
    } catch (err) {
        return next(
            new ApiError(
                500,
                `Lỗi không thể xóa tài khoản có id=${req.params.id}`
            )
        )
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const staffService = new StaffService(MongoDB.client);
        const deletedCount = await staffService.deleteAll();
        return res.send({
            message: `${deletedCount} admin xóa thành công`,
        });
    } catch (err) {
        return next(new ApiError(
            500,
            `Lỗi xảy ra khi xóa`
        ));
    }
};

exports.login = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Nhập liệu không thể rỗng"));
    }

    try {
        const staffService = new StaffService(MongoDB.client);
        const { username, password } = req.body;


        const document = await staffService.findUser(username, password);
        if (!document)
            res.send(null);
        else {
            req.session.user = document;
            req.session.authorized = true;
            return res.send(document);
        }

    } catch (err) {
        return next(new ApiError(
            500,
            `Lỗi xảy ra khi xác minh đăng nhập`
        ));
    }
};


//Đếm số nhân viên theo chức vụ
exports.count = async (req, res, next) => {
    try{
        const staffService = new StaffService(MongoDB.client);
        let staff = await staffService.count({ role: "nhân viên" });
        let manager = await staffService.count({ role: "quản lý" });
        let more = await staffService.count({ role: "khác" });
        return res.send([
            staff,
            manager,
            more,
        ]);
    } catch (err) {
        return next(new ApiError(
            500,
            `Lỗi xảy ra khi lấy số nhân viên theo chức vụ`
        ));
    }
};
