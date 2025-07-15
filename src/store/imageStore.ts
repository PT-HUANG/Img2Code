import { create } from "zustand";

type ImageState = {
  files: { file: File; id: string; isChecked: boolean }[] | [];
  fileTypes: string[];
  setFiles: (files: { file: File; id: string; isChecked: boolean }[]) => void;
  setFileTypes: (
    files: { file: File; id: string; isChecked: boolean }[]
  ) => void;
};

export const useImageStore = create<ImageState>((set) => ({
  files: [],
  fileTypes: [],
  setFiles: (fileList) => set({ files: fileList }),
  setFileTypes: (
    fileList: { file: File; id: string; isChecked: boolean }[]
  ) => {
    const extension: string[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const dotindex = fileList[i].file.name.lastIndexOf(".");
      const filetype = fileList[i].file.name.slice(dotindex + 1);
      if (!extension.find((ext) => ext === filetype)) {
        extension.push(filetype);
      }
    }
    set({ fileTypes: extension });
  },
}));
