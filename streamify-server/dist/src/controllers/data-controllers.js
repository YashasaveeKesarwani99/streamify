"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTableData = exports.getUserGrowth = exports.getTopFiveStreamedSongs = exports.getMostStreamedArtist = exports.getRevenueDistribution = exports.getMetricCardsData = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const getFileData = (filename) => {
    return new Promise((resolve, reject) => {
        fs_1.default.readFile(path_1.default.join(__dirname, "../data", filename), "utf8", (err, data) => {
            if (err)
                reject(err);
            else
                resolve(JSON.parse(data));
        });
    });
};
const getImageData = (filename) => {
    return new Promise((resolve, reject) => {
        fs_1.default.readFile(path_1.default.join(__dirname, "../data", filename), (err, data) => {
            if (err)
                reject(err);
            else
                resolve(Buffer.from(data).toString("base64"));
        });
    });
};
const getMetricCardsData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield getFileData("metric-cards.json");
        res.json(data);
    }
    catch (error) {
        res.status(500).send("Error reading file");
    }
});
exports.getMetricCardsData = getMetricCardsData;
const getRevenueDistribution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield getFileData("revenue-distribution.json");
        res.json(data);
    }
    catch (error) {
        res.status(500).send("Error reading file");
    }
});
exports.getRevenueDistribution = getRevenueDistribution;
const getMostStreamedArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [data, image] = yield Promise.all([
            getFileData("most-streamed.json"),
            getImageData("kanye-west.png"),
        ]);
        res.json(Object.assign(Object.assign({}, data), { image: `data:image/png;base64,${image}` }));
    }
    catch (error) {
        res.status(500).send("Error reading file");
    }
});
exports.getMostStreamedArtist = getMostStreamedArtist;
const getTopFiveStreamedSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield getFileData("top-streamed.json");
        res.json(data);
    }
    catch (error) {
        res.status(500).send("Error reading file");
    }
});
exports.getTopFiveStreamedSongs = getTopFiveStreamedSongs;
const getUserGrowth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield getFileData("user-growth.json");
        res.json(data);
    }
    catch (error) {
        res.status(500).send("Error reading file");
    }
});
exports.getUserGrowth = getUserGrowth;
const getTableData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield getFileData("table-data.json");
        res.json(data);
    }
    catch (error) {
        res.status(500).send("Error reading file");
    }
});
exports.getTableData = getTableData;
