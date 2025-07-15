import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { useImageStore } from "@/store/imageStore";

type FilterButtonProps = {
  filterMode: string;
  setFilterMode: (mode: string) => void;
};

function FilterButton({ filterMode, setFilterMode }: FilterButtonProps) {
  const files = useImageStore((state) => state.files);
  const fileTypes = useImageStore((state) => state.fileTypes);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="px-4 py-5 gap-3 cursor-pointer bg-gray-600 hover:bg-gray-700 disabled:bg-gray-700 text-white hover:text-white border-none font-bold cursor-pointer"
          disabled={files.length === 0}
        >
          <i className="fa-solid fa-sliders text-xl"></i>
          <div>篩選</div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuLabel className="font-bold">檔案副檔名</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={filterMode}
          onValueChange={setFilterMode}
        >
          <DropdownMenuRadioItem value="all">全選</DropdownMenuRadioItem>
          {fileTypes.map((type) => {
            return (
              <DropdownMenuRadioItem key={type} value={type}>
                {type}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FilterButton;
