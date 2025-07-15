import { Button } from "@/components/ui/button";
import { useImageStore } from "@/store/imageStore";
import { saveAs } from "file-saver";
import JSZip from "jszip";

type DownloadButtonProps = {
  filteredFiles: { file: File; id: string; isChecked: boolean }[];
};

function DownloadButton({ filteredFiles }: DownloadButtonProps) {
  const files = useImageStore((state) => state.files);

  const handleDownloadFiles = () => {
    const zip = new JSZip();
    for (let i = 0; i < filteredFiles.length; i++) {
      if (filteredFiles[i].isChecked) {
        const { file } = filteredFiles[i];
        zip.file(file.name, file);
      } else continue;
    }
    zip.generateAsync({ type: "blob" }).then((blob) => {
      saveAs(blob, "rename.zip");
    });
  };

  return (
    <Button
      variant="outline"
      className="px-4 py-5 gap-3 cursor-pointer bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-600 text-white hover:text-white border-none font-bold cursor-pointer"
      disabled={files.length === 0}
      onClick={handleDownloadFiles}
    >
      <i className="fa-solid fa-file-arrow-down"></i>
      <div>下載</div>
    </Button>
  );
}

export default DownloadButton;
