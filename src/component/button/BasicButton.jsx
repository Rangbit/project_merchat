export default function BasicButton({
  width = "98",
  height = "34",
  innerText,
  onClick,
}) {
  return (
    <>
      <button
        className="font-medium text-center text-white rounded bg-siamBlack hover:bg-semiBlack"
        onClick={onClick}
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        {innerText}
      </button>
    </>
  );
}
