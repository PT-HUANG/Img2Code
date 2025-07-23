import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { useImageStore } from "@/store/imageStore";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Checkbox } from "@/components/ui/checkbox";

type ImgCardProps = {
  file: File;
  id: string;
  isChecked: boolean;
};

function ImgCard({ file, id, isChecked }: ImgCardProps) {
  const [src, setSrc] = useState("");
  const files = useImageStore((state) => state.files);
  const setFiles = useImageStore((state) => state.setFiles);
  const setFileTypes = useImageStore((state) => state.setFileTypes);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, animateLayoutChanges: () => false });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setSrc(url);
  }, [file]);

  const handleDelete = () => {
    const nextFiles = files.filter((element) => element.id !== id);
    setFiles(nextFiles);
    setFileTypes(nextFiles);
  };
  const [isExpanded, setIsExpanded] = useState(false);

  const dragListeners = isExpanded ? {} : listeners;
  const handleAccordionChange = () => {
    setIsExpanded(!isExpanded);
  };

  const handleToggleChecked = () => {
    const nextFiles = files.map((file) => {
      if (file.id !== id) {
        return file;
      } else {
        return { ...file, isChecked: !file.isChecked };
      }
    });
    setFiles(nextFiles);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-full flex items-start gap-2 group my-1"
    >
      <Checkbox
        checked={isChecked}
        onCheckedChange={handleToggleChecked}
        className="mx-2 my-3 border border-gray-400 cursor-pointer"
      />
      <Accordion
        {...attributes}
        {...dragListeners}
        type="single"
        collapsible
        className="relative text-white grow"
        onValueChange={handleAccordionChange}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="[&>svg]:text-white font-bold p-2 px-4 bg-teal-400 rounded-sm items-center lg:px-6 lg:py-3 hover:no-underline cursor-pointer">
            {file.name}
          </AccordionTrigger>
          <AccordionContent className="mt-2">
            <img src={src} alt={file.name} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <i
        className="fa-solid fa-trash my-3 text-stone-300 hover:text-stone-700 transition-colors duration:300 cursor-pointer lg:opacity-0 lg:group-hover:opacity-100"
        onClick={handleDelete}
        draggable={false}
      ></i>
    </div>
  );
}

export default ImgCard;
