import Vibrant from "node-vibrant";
import { useEffect, useState } from "react";

function ImageColorPalette({ imageUrl }) {
  const [colors, setColors] = useState([]);
  const [formattedColors, setFormattedColors] = useState([]);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        // Vibrant를 사용해 이미지 색상 추출
        const palette = await Vibrant.from(imageUrl)
          .maxColorCount(256) // 색상 추출 개수 최대화 (000000~ ffffff)
          .getPalette();

        const topColors = Object.values(palette)
          .filter((swatch) => swatch) // 유효한 색상만 포함
          .sort((a, b) => b.population - a.population) // 빈도수 기준 내림차순 정렬
          .slice(0, 5); // 상위 5개 선택

        // RGB 배열 추출
        const extractedColors = topColors.map((swatch) => swatch.rgb);

        // 포맷팅된 RGB 값
        const formatted = extractedColors.map(
          (rgb) => `(${rgb.map((value) => Math.round(value)).join(", ")})`
        );

        setColors(extractedColors);
        setFormattedColors(formatted);
      } catch (error) {
        console.error("Error extracting colors:", error);
      }
    };

    fetchColors();
  }, [imageUrl]);

  if (!colors.length) return <div>Loading colors...</div>;

  return (
    <div className="flex flex-col items-center gap-2">
      {colors.map((rgb, index) => (
        <div className="flex items-center w-full gap-2" key={index}>
          <div
            className="w-6 h-6"
            style={{
              backgroundColor: `rgb(${rgb.join(",")})`,
            }}
          />
          <span>{formattedColors[index]}</span>
        </div>
      ))}
    </div>
  );
}

export default ImageColorPalette;
