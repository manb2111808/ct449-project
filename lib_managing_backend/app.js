const express = require("express");
const cors = require("cors");
const app = express();

const session = require('express-session');

const booksRouter = require("./app/routes/book.routes");
const bookDetailsRouter = require("./app/routes/bookDetail.routes");
// const contactsRouter = require("./app/routes/contact.routes");
// const staffsRouter = require("./app/routes/staff.routes");

const ApiError = require("./app/api-error");

app.use(cors());
app.use(express.json());

//Theo dõi các hoạt động của người dùng (session tracking)
app.use(session({
    secret:'this_is_my_secret',
    cookie:{
        sameSite: 'strict',
    }
}))

//Thêm các Routes
app.use("/api/books", booksRouter);
app.use("/api/bookDetails", bookDetailsRouter);
// app.use("/api/contacts", contactsRouter);
// app.use("/api/staffs", staffsRouter);

//Kiểm thử server
app.get("/", (req, res) => {
    res.json({ message: "Chào mừng đến với Quản lý mượn trả sách thư viện"});
});

//Lỗi 404: Không tìm thấy trang 
app.use((req, res, next)=>{
    return next(new ApiError(404, "Không tìm thấy trang"));
})

//Lỗi 500: Lỗi server cục bộ
app.use((err, req, res, next)=>{
    return res.status(err.statusCode || 500).json({
        message: err.message || "Lỗi máy chủ cục bộ",
    });
});

module.exports = app;