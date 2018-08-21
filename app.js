var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var session = require("express-session");
var favicon = require('serve-favicon');
var MongoStore = require("connect-mongo")(session);
var helmet = require('helmet');
var path = require('path');
var app = express();

var crypto = require('crypto');
var multer = require('multer');
var GridFSStorage = require('multer-gridfs-storage');
var gridfs_stream = require('gridfs-stream');

//APP CONFIGURATION
app.use(helmet());
app.use(favicon(__dirname + '/public/favicon.ico'));

app.enable('trust proxy');

var databaseUrl = "mongodb://localhost/customerProfile";
//mongoose.Promise = require('bluebird');
mongoose.connect(databaseUrl, { useMongoClient: true }).then(
    () => {
        console.log('Database is connected');
    },
    err => {
        console.log('Can not connect to the database' + err);
    }
);

// mongoose.connect(databaseUrl);
var db = mongoose.connection;

//handling mongo error
db.on("error", console.error.bind(console, "Connection Error: "));

let gfs;
db.once("open", function () {
    gfs = gridfs_stream(db.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFSStorage({
    url: databaseUrl,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    metadata: req.body.customername,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });

//using sessions for tracking logins
app.use(session({
    secret: "work hard",
    resave: true,
    saveUninitialized: false,
    cookie: {
        //maxAge: 30 * 24 * 60 * 60 * 1000 // 1 month
    },
    store: new MongoStore({
        mongooseConnection: db
    })
}));


// Used in update
app.locals.make_custom_dropdown = function (name, value, list, classname) {
    if (!classname) {
        classname = '';
    }

    var dropdown = '<select class="form-control ' + classname + '" name="' + name + '">';

    dropdown += '<option value="">No response</option>';

    for (var i = 0; i < list.length; i++) {
        if (value == list[i]) {
            dropdown += '<option value="' + list[i] + '" selected>' + list[i] + '</option>';
        } else {
            dropdown += '<option value="' + list[i] + '">' + list[i] + '</option>';
        }
    }

    dropdown += '</select>';

    return dropdown;
};

// Exposes the username for the header nav bar.
app.use(function expose_username(req, res, next) {
    res.locals.user = req.session.user;
    next();
});

// Disables back button from showing contents when logged out.
app.use(function (req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});

// app.use(function printSession(req, res, next) {
//     console.log('req.session', req.session);
//     next();
// });

// set so we don't have to type .ejs all the time when routing
app.set("view engine", "ejs");
// used so we can make a public folder that contains stylesheet and js, and be able to access it
app.use(express.static(__dirname + "/public"));
//including routes. Seperating the routes to different file, so it will be cleaner.
var routes = require("./routes/router");
// used so we can get data from forms and etc.
app.use(bodyParser.urlencoded({ extended: true }));
// security. This line of code has to be always after body-parser
app.use(expressSanitizer());
// so we can use PUT request
app.use(methodOverride("_method"));
app.use(routes);

///////////////////////////////////////////////////////////////////////////////////////////////////////

// @route GET /
// @desc Loads form
app.get('/uploads', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
            res.render('uploads', { files: false });
        } else {
            files.map(file => {
                if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
                    file.isImage = true;
                } else {
                    file.isImage = false;
                }
            });
            //console.log(files);
            res.render('uploads', {files: files});
        }
    });
});

// @route POST /upload
// @desc  Uploads file to DB
app.post('/uploads', upload.single('file'), (req, res) => {
    //console.log(req.body.customername);
    //res.redirect(req.headers.referer);
    //res.json({ file: req.file });
    res.redirect('/customerprofile/image/' + req.file.filename);
    // res.status(200);
});

// @route GET /files
// @desc  Display all files in JSON
app.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }

        // Files exist
        return res.render('uploads', { files: files });
    });
});

// @route GET /files/:filename
// @desc  Downloads the file
app.get('/files/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }
        // File exists
        //return res.json(file);

        res.setHeader('Content-disposition', 'attachment; filename=' + file.filename);
        res.setHeader('Content-type', file.contentType);

        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
    });
});

// @route GET /image/:filename
// @desc Display Image
app.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }

        // Check if image
        if (file.contentType == 'image/jpeg' || file.contentType == 'image/png') {
            // Read output to browser
            res.setHeader('Content-disposition', 'attachment; filename=' + file.filename);
            res.setHeader('Content-type', file.contentType);

            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            // res.status(404).json({
            //     err: 'Not an image'
            // });
        }
    });
});

// @route DELETE /files/:id
// @desc  Delete file
app.delete('/files/:id', (req, res) => {
    // console.log('delete reached')
    // console.log(req.params.id)
    gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
        if (err) {
            return res.status(404).json({ err: err });
        }
        res.redirect('/customerprofile/uploads');
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////

//catch 404 and forward to error handler
app.use(function () {
    var err = new Error("File Not Found");
    err.status = 404;
});

//error handler
//defined as the last app.use callback
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});

let port = process.env.PORT || 8000;

app.listen(port, function () {
    console.log(`App is running on ${port}.`);
});
