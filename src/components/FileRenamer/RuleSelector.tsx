import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRuleStore } from "@/store/renameRuleStore";

function RuleSelector() {
  const title = useRuleStore((state) => state.title);
  const setTitle = useRuleStore((state) => state.setTitle);
  const rule = useRuleStore((state) => state.rule);
  const setRule = useRuleStore((state) => state.setRule);
  const init = useRuleStore((state) => state.init);
  const setInit = useRuleStore((state) => state.setInit);

  return (
    <div className="w-full h-fit md:w-[45%] max-w-[350px]">
      <div className="bg-yellow-200 shadow-md text-gray-700 font-bold rounded-md m-4 ml-0 px-4 py-6 max-w-[350px]">
        <div>檔案名稱</div>
        <div className="flex justify-between mt-2">
          <Label htmlFor="file-name" className="text-base font-bold">
            標題
          </Label>
          <Input
            id="file-name"
            className="w-[75%] max-w-[250px] bg-yellow-100 border-yellow-100 focus-visible:ring-ring/0"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Input>
        </div>
      </div>
      <div className="bg-yellow-200 shadow-md text-gray-700 font-bold rounded-md m-4 ml-0 p-4 max-w-[350px]">
        <div>命名規則</div>
        <div className="flex justify-between my-2">
          <Label className="text-base font-bold">格式</Label>
          <Select defaultValue={rule} onValueChange={(e) => setRule(e)}>
            <SelectTrigger className="w-[75%] max-w-[250px] bg-yellow-100 border-yellow-100 focus-visible:ring-ring/0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="type-1" className="font-bold">
                  1, 2, 3
                </SelectItem>
                <SelectItem value="type-2" className="font-bold">
                  01, 02, 03
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-between mt-2">
          <Label htmlFor="initial-value" className="text-base font-bold">
            起始值
          </Label>
          <Input
            id="initial-value"
            type="number"
            value={init}
            onChange={(e) => setInit(Number(e.target.value))}
            min={1}
            className="w-[75%] max-w-[250px] bg-yellow-100 border-yellow-100 focus-visible:ring-ring/0"
          ></Input>
        </div>
      </div>
    </div>
  );
}

export default RuleSelector;
