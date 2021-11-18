"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_gridfs_storage_1 = require("multer-gridfs-storage");
const atlasDB_1 = require("../services/atlasDB");
const storage = new multer_gridfs_storage_1.GridFsStorage({
    url: atlasDB_1.myURI,
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];
        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-any-name-${file.originalname}`;
            return filename;
        }
        return {
            bucketName: "photos",
            filename: `${Date.now()}-Avatar-${file.originalname}`
        };
    }
});
exports.upload = multer_1.default({ storage });
