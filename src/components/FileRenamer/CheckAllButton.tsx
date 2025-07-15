import { Button } from "@/components/ui/button";
import { useImageStore } from "@/store/imageStore";

function CheckAllButton() {
  const setFiles = useImageStore((state) => state.setFiles);
  const files = useImageStore((state) => state.files);

  const handleCheckAll = () => {
    const nextFiles = files.every((file) => file.isChecked === false)
      ? files.map((file) => {
          return { ...file, isChecked: true };
        })
      : files.map((file) => {
          return { ...file, isChecked: false };
        });
    setFiles(nextFiles);
  };

  return (
    <Button
      onClick={handleCheckAll}
      className="px-4 py-5 cursor-pointer bg-pink-500 hover:bg-pink-600 disabled:bg-pink-600 text-white"
      disabled={files.length === 0}
    >
      <i className="fa-solid fa-square-check"></i>
      <div className="font-bold">選取</div>
    </Button>
  );
}

export default CheckAllButton;
