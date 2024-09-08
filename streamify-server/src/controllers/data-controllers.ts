import path from "path";
import fs from "fs";
import { Request, Response } from "express";

const getFileData = (filename: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, "../data", filename),
      "utf8",
      (err, data) => {
        if (err) reject(err);
        else resolve(JSON.parse(data));
      }
    );
  });
};

const getImageData = (filename: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, "../data", filename), (err, data) => {
      if (err) reject(err);
      else resolve(Buffer.from(data).toString("base64"));
    });
  });
};

export const getMetricCardsData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await getFileData("metric-cards.json");
    res.json(data);
  } catch (error) {
    res.status(500).send("Error reading file");
  }
};

export const getRevenueDistribution = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await getFileData("revenue-distribution.json");
    res.json(data);
  } catch (error) {
    res.status(500).send("Error reading file");
  }
};

export const getMostStreamedArtist = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const [data, image] = await Promise.all([
      getFileData("most-streamed.json"),
      getImageData("kanye-west.png"),
    ]);
    res.json({ ...data, image: `data:image/png;base64,${image}` });
  } catch (error) {
    res.status(500).send("Error reading file");
  }
};

export const getTopFiveStreamedSongs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await getFileData("top-streamed.json");
    res.json(data);
  } catch (error) {
    res.status(500).send("Error reading file");
  }
};

export const getUserGrowth = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await getFileData("user-growth.json");
    res.json(data);
  } catch (error) {
    res.status(500).send("Error reading file");
  }
};

export const getTableData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await getFileData("table-data.json");
    res.json(data);
  } catch (error) {
    res.status(500).send("Error reading file");
  }
};
