import { Router } from "express";
import {
  getTableData,
  getUserGrowth,
  getMetricCardsData,
  getMostStreamedArtist,
  getTopFiveStreamedSongs,
  getRevenueDistribution,
} from "../controllers/data-controllers";

const router = Router();

router.get("/metric-cards", getMetricCardsData);
router.get("/most-streamed", getMostStreamedArtist);
router.get("/revenue-distribution", getRevenueDistribution);
router.get("/top-streamed", getTopFiveStreamedSongs);
router.get("/user-growth", getUserGrowth);
router.get("/table-data", getTableData);
export default router;
