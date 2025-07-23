import { useState, useEffect } from "react";
import { useImageStore } from "@/store/imageStore";
import { useFilterModeStore } from "@/store/filterModeStore";

import RuleSelector from "./RuleSelector";
import CheckAllButton from "./CheckAllButton";
import UploadButton from "./UploadButton";
import FilterButton from "./FilterButton";
import RenameButton from "./RenameButton";
import DownloadButton from "./DownloadButton";
import ImgCard from "./ImgCard";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { restrictToParentElement } from "@dnd-kit/modifiers";

import type { DragEndEvent } from "@dnd-kit/core";

function FileRenamer() {
  const setFiles = useImageStore((state) => state.setFiles);
  const files = useImageStore((state) => state.files);
  const setFilterMode = useFilterModeStore((state) => state.setFilterMode);
  const filterMode = useFilterModeStore((state) => state.filterMode);
  const [filteredFiles, setFilteredFiles] = useState(files);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 1,
    },
  });
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id === over?.id) return;
    const orginalPosition = filteredFiles.findIndex(
      (file) => file.id === active.id
    );
    const newPosition = filteredFiles.findIndex((file) => file.id === over?.id);
    const newFilterFiles = arrayMove(
      filteredFiles,
      orginalPosition,
      newPosition
    );
    setFiles(newFilterFiles);
  };

  useEffect(() => {
    if (!files) return;
    const filtered = files.filter((element) => {
      const { file } = element;
      if (filterMode === "all") return true;
      return file.name.toLowerCase().endsWith(filterMode);
    });
    setFilteredFiles(filtered);
  }, [files, filterMode]);

  return (
    <div className="container w-[90%] max-w-7xl min-h-[850px] mx-auto my-10 text-base">
      <div className="text-2xl font-bold">重新命名區</div>
      <div className="flex flex-col md:flex-row h-[90%] mt-5">
        <RuleSelector />
        <div className="w-full xl:max-w-[800px] md:min-h-[275px] md:h-[100%] mt-2 md:mt-4 px-6 md:pb-8 border border-gray-100 rounded-md bg-gray-100">
          <div className="w-[80%] flex flex-wrap items-center lg:justify-between min-[1180px] my-4 mx-auto">
            <UploadButton setFilteredFiles={setFilteredFiles} />
            <div className="flex flex-wrap items-center gap-3">
              <CheckAllButton />
              <FilterButton
                filterMode={filterMode}
                setFilterMode={setFilterMode}
              />
              <RenameButton />
              <DownloadButton filteredFiles={filteredFiles} />
            </div>
          </div>
          <div className="mx-auto w-full lg:w-[90%] flex flex-col items-start">
            <DndContext
              onDragEnd={handleDragEnd}
              collisionDetection={closestCenter}
              sensors={sensors}
              modifiers={[restrictToParentElement]}
            >
              <SortableContext
                items={filteredFiles}
                strategy={verticalListSortingStrategy}
              >
                {filteredFiles.length !== 0 &&
                  filteredFiles.map((filterFile, index) => {
                    const { file, id, isChecked } = filterFile;
                    return (
                      <ImgCard
                        key={index}
                        file={file}
                        id={id}
                        isChecked={isChecked}
                      />
                    );
                  })}
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileRenamer;
