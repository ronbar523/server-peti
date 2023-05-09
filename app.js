const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.listen(process.env.PORT || 8000)

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static("public"));
app.set("view engine", "ejs");

app.use("/public", express.static("public"));


const UserRouter = require('./collection/user/routes/userRoute');
const FollowRouter = require('./collection/follow/routes/followRoute');
const BlockRouter = require('./collection/block/routes/blockRoute');
const PostArraysRouter = require('./collection/postArrays/routes/postArraysRoute');
const PostRouter = require('./collection/post/routes/postRoute');
const CommentRouter = require('./collection/comment/routes/commentRoute');


app.use("/user", UserRouter);
app.use("/follow", FollowRouter);
app.use("/block", BlockRouter);
app.use("/post_arrays", PostArraysRouter);
app.use("/post", PostRouter);
app.use("/comment", CommentRouter);


module.exports = app;
