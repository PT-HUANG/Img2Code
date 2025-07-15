import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { nanoid } from "nanoid";
import { useImageStore } from "@/store/imageStore";

type setFilteredFilesType = {
  setFilteredFiles: (arg: []) => void;
};

function UploadButton({ setFilteredFiles }: setFilteredFilesType) {
  const files = useImageStore((state) => state.files);
  const setFiles = useImageStore((state) => state.setFiles);
  const setFileTypes = useImageStore((state) => state.setFileTypes);

  const handleUploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadfiles = e.target.files;
    if (uploadfiles && uploadfiles.length > 0) {
      setFilteredFiles([]);
      const fileArray = Array.from(uploadfiles).map((file) => {
        const id = nanoid(10);
        return { file, id, isChecked: true };
      });
      setFiles(fileArray);
      setFileTypes(fileArray);
      e.target.value = "";
    }
  };

  return (
    <div className="flex items-center lg:justify-center gap-3 py-2 lg:py-4">
      <Label htmlFor="image-upload">
        <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 has-[>svg]:px-3 bg-cyan-400 hover:bg-cyan-500 shadow-md px-3 py-5 cursor-pointer border-none">
          <i className="fa-solid fa-folder text-xl text-white"></i>
        </div>
      </Label>
      <Input
        id="image-upload"
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleUploadFiles}
      />
      <div
        className={`${
          files.length === 0 ? "text-gray-500" : ""
        } text-sm font-bold`}
      >
        {files.length === 0 ? "未選擇任何檔案" : `${files?.length} 個檔案`}
      </div>
    </div>
  );
}

export default UploadButton;
