import fs from "fs";
import path from "path";
import https from "https";

export default async function handler(req, res) {
  const { url, name } = req.query;

  if (!url || !name) {
    res
      .status(400)
      .json({ error: "Both 'url' and 'name' parameters are required" });
    return;
  }

  try {
    // 디코딩된 URL
    const decodedUrl = decodeURIComponent(url);

    // name에서 공백을 '_'로 대체
    const sanitizedName = name.replace(/\s+/g, "_");

    const directory = path.resolve("./public/images/temp");
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    const filePath = path.join(directory, `${sanitizedName}.png`);

    await new Promise((resolve, reject) => {
      https
        .get(decodedUrl, (response) => {
          const fileStream = fs.createWriteStream(filePath);

          response.pipe(fileStream);

          fileStream.on("finish", () => {
            fileStream.close();
            resolve(); // 다운로드 완료
          });

          fileStream.on("error", (error) => {
            reject(error); // 다운로드 실패
          });
        })
        .on("error", (error) => {
          reject(error); // HTTP 요청 실패
        });
    });

    // 다운로드가 완료되었을 때 응답 반환
    res
      .status(200)
      .json({ success: true, path: `/images/temp/${sanitizedName}.png` });
  } catch (error) {
    console.error("Error in handler:", error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}
