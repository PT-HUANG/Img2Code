import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button";


function TemplateGenerator() {
  return (
    <div className="container max-w-7xl m-10 flex flex-col text-base">
      <div className="text-2xl font-bold">圖片上傳區</div>
      <div className="flex gap-2 items-center my-6">
        <Label htmlFor="select_Template" className="text-lg">選擇模板：</Label>
        <Select>
          <SelectTrigger className="w-[120px] border-zinc-500" id="select_Template">
            <SelectValue placeholder="背景" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="背景">背景</SelectItem>
            <SelectItem value="元件">元件</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="workspace">
        <div>
          <Label htmlFor="file-upload" className="w-fit px-4 py-3 justify-center bg-[#0dcaf0] text-white font-bold rounded-md cursor-pointer ">
            選擇檔案
          </Label>
          <Input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                console.log("上傳的檔案：", file.name);
              }
            }}
          />
          <div className="menu">
            <div>HTML結構</div>
            <button id="copy_HTML" disabled>複製HTML</button>
            <div className="sucessMessage_HTML"></div>
          </div>
          <textarea id="textarea_HTML" rows={30} cols={150}></textarea>
        </div>
        <div>
          <button id="generate_CSS" disabled>產生CSS</button>
          <div className="menu">
            <div>CSS樣式</div>
            <button id="copy_CSS" disabled>複製CSS</button>
            <div className="sucessMessage_CSS"></div>
          </div>
          <textarea id="textarea_CSS" rows={30} cols={150}></textarea>
        </div>
      </div>
    </div>
  )
}

export default TemplateGenerator;