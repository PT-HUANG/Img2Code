import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function TemplateGenerator() {
  const [uploadFiles, setUploadFiles] = useState("未選擇任何檔案");
  const [mode, setMode] = useState("背景");
  const [htmlTemplateValue, setHtmlTemplateValue] = useState("");
  const [CSSTemplateValue, setCSSTemplateValue] = useState("");
  const [isCopyHTMLDisabled, setIsCopyHTMLDisabled] = useState(true);
  const [isGenerateCSSDisabled, setIsGenerateCSSDisabled] = useState(true);
  const [isCopyCSSDisabled, setIsCopyCSSDisabled] = useState(true);
  const [messageHTML, setMessageHTML] = useState("");
  const [messageCSS, setMessageCSS] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadFiles(`${files.length} 個檔案`);
      handleGenerateHTML(files);
      setIsCopyHTMLDisabled(false);
    } else {
      setUploadFiles("未選擇任何檔案");
    }
  };

  const handleGenerateHTML = (files: FileList) => {
    const templateArray = Array(Object.keys(files).length);
    let loadedCount = 0;

    Array.from(files).forEach((file, index) => {
      const img = new Image();
      img.onload = () => {
        const className = file.name.split(".").slice(0, -1).join(".");
        const formattedText =
          mode === "背景"
            ? `<section class="bg ${className}">
    <div class="container relative">
          <img class="lazy" data-src="./images/BG/${file.name}" width="${img.width}" height="${img.height}" src="./images/BG/${file.name}">
    </div>
</section>`
            : `<img class="lazy absolute ${className}" data-src="images/${file.name}" width="${img.width}" height="${img.height}" src="./images/${file.name}">`;
        templateArray[index] = formattedText;
        loadedCount++;
        if (loadedCount === files.length) {
          const result = templateArray.join("\n");
          setHtmlTemplateValue(result);
        }
      };
      img.src = URL.createObjectURL(file);
    });
    if (mode === "元件") {
      setIsGenerateCSSDisabled(false);
    }
  };

  const handleGenerateCSS = () => {
    const imagesArray = htmlTemplateValue.match(/<img[^>]+>/g);
    const result = imagesArray?.map((img) => {
      const arr = img.split(" ");
      const className = arr[3].slice(0, -1);
      const width = (Number(arr[5].slice(7, -1)) / 10).toFixed(1);

      const format =
        Number(width) * 10 > 1000
          ? `
.${className} {
  width: 100%;
  top: 0%;
  left: 0%;
}
`
          : `
.${className} {
  width: ${width}%;
  top: 0%;
  left: 0%;
}
`;

      return format;
    });
    if (result) {
      setCSSTemplateValue(result.join("").trim());
    }
  };

  const handleCopyHTML = async () => {
    try {
      await navigator.clipboard.writeText(htmlTemplateValue);
      setMessageHTML("複製成功😊");
    } catch (err) {
      console.error("複製失敗:", err);
      setMessageHTML("複製失敗😢");
    } finally {
      setTimeout(() => {
        setMessageHTML("");
      }, 1500);
    }
  };

  const handleCopyCSS = async () => {
    try {
      await navigator.clipboard.writeText(CSSTemplateValue);
      setMessageCSS("複製成功😊");
    } catch (err) {
      console.error("複製失敗:", err);
      setMessageCSS("複製失敗😢");
    } finally {
      setTimeout(() => {
        setMessageCSS("");
      }, 1500);
    }
  };

  return (
    <div className="container w-[90%] h-full min-h-[800px] max-w-7xl mx-auto my-10 text-base">
      <div className="text-2xl font-bold">模板產生區</div>
      <div className="flex gap-2 items-center mt-6 mb-10">
        <Label htmlFor="select_Template" className="text-lg">
          選擇模板：
        </Label>
        <Select
          defaultValue="背景"
          onValueChange={(e) => {
            setMode(e);
            if (inputRef.current) {
              inputRef.current.value = "";
            }
            setUploadFiles("未選擇任何檔案");
            setHtmlTemplateValue("");
            setCSSTemplateValue("");
            setIsCopyHTMLDisabled(true);
            setIsGenerateCSSDisabled(true);
            setIsCopyCSSDisabled(true);
          }}
        >
          <SelectTrigger
            className="w-[140px] border-zinc-500 rounded-sm"
            id="select_Template"
          >
            <SelectValue placeholder="背景" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="背景">背景</SelectItem>
            <SelectItem value="元件">元件</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col md:flex-row gap-10 md:gap-4 h-[90%]">
        <div className="md:w-[45%] h-[100%]">
          <div className="flex items-center gap-3 mb-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Label
                  htmlFor="file-upload"
                  className="w-fit px-4 py-3 justify-center bg-[#0dcaf0] hover:bg-[#07a1c1] duration-300 text-white font-bold rounded-md cursor-pointer "
                >
                  選擇檔案
                </Label>
              </TooltipTrigger>
              <TooltipContent>
                <p>上傳圖片</p>
              </TooltipContent>
            </Tooltip>
            <span className="text-sm">{uploadFiles}</span>
            <Input
              id="file-upload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleUploadFiles}
              ref={inputRef}
            />
          </div>
          <div className="flex items-center gap-3 mb-4 ml-2">
            <div>HTML結構</div>
            <Button
              className="cursor-pointer bg-green-500 hover:bg-green-600 font-bold"
              onClick={handleCopyHTML}
              disabled={isCopyHTMLDisabled}
            >
              複製HTML
            </Button>
            <div className="font-bold">{messageHTML}</div>
          </div>
          <Textarea
            value={htmlTemplateValue}
            onChange={(e) => setHtmlTemplateValue(e.target.value)}
            className="h-[70%] h-[250px] lg:h-[600px] border-zinc-500 rounded-sm"
          ></Textarea>
        </div>
        <div className="md:w-[45%] h-[100%]">
          <Button
            className="cursor-pointer bg-pink-500 hover:bg-pink-600 font-bold"
            onClick={handleGenerateCSS}
            disabled={mode === "背景" || isGenerateCSSDisabled}
          >
            產生CSS
          </Button>
          <div className="flex items-center gap-5 my-4 ml-2">
            <div>CSS樣式</div>
            <Button
              className="cursor-pointer bg-amber-500 hover:bg-amber-600 font-bold"
              disabled={CSSTemplateValue === "" && isCopyCSSDisabled}
              onClick={handleCopyCSS}
            >
              複製CSS
            </Button>
            <div className="font-bold">{messageCSS}</div>
          </div>
          <Textarea
            value={CSSTemplateValue}
            onChange={(e) => setCSSTemplateValue(e.target.value)}
            className="h-[70%] h-[250px] lg:h-[600px] border-zinc-500 rounded-sm"
          ></Textarea>
        </div>
      </div>
    </div>
  );
}

export default TemplateGenerator;
