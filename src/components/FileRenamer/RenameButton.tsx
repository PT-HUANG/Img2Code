import { Button } from "@/components/ui/button";
import { useImageStore } from "@/store/imageStore";
import { useRuleStore } from "@/store/renameRuleStore";
import { useFilterModeStore } from "@/store/filterModeStore";

function RenameButton() {
  const setFiles = useImageStore((state) => state.setFiles);
  const files = useImageStore((state) => state.files);
  const title = useRuleStore((state) => state.title);
  const rule = useRuleStore((state) => state.rule);
  const init = useRuleStore((state) => state.init);
  const filterMode = useFilterModeStore((state) => state.filterMode);

  const handleRename = () => {
    let index = 0;
    const nextFiles = files.map((element) => {
      const dotindex = element.file.name.lastIndexOf(".");
      const filetype = element.file.name.slice(dotindex);
      if (filterMode !== "all" && filetype !== `.${filterMode}`) {
        return element;
      } else if (!element.isChecked) {
        return element;
      } else {
        const newName =
          rule === "type-1"
            ? `${title}${init + index}${filetype}`
            : `${title}${(init + index)
                .toString()
                .padStart(2, "0")}${filetype}`;
        const newFile = new File([element.file], newName);
        index++;
        return { ...element, file: newFile };
      }
    });
    setFiles(nextFiles);
  };

  return (
    <Button
      variant="outline"
      className="px-4 py-5 gap-3 cursor-pointer bg-green-600 hover:bg-green-700 disabled:bg-green-700 text-white hover:text-white border-none font-bold cursor-pointer"
      disabled={files.length === 0}
      onClick={handleRename}
    >
      <i className="fa-solid fa-play text-xl"></i>
      <div>重新命名</div>
    </Button>
  );
}

export default RenameButton;
