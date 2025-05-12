import { create } from "zustand";
import { z } from "zod";

// types
const models = ["llama3.2:3b", "qwen2.5-coder:7b"] as const;
export type ModelType = (typeof models)[number];
export const ModelTypeZod = z.enum(models);

// Define the model store type
interface ModelStore {
  currentModel: ModelType;
  setCurrentModel: (model: ModelType) => void;
}

// Create a Zustand store
const useModelStore = create<ModelStore>((set) => ({
  currentModel: "llama3.2:3b",
  setCurrentModel: (model: ModelType) => set({ currentModel: model }),
}));

export const useModels = () => {
  const { currentModel, setCurrentModel } = useModelStore();

  const getModelList = () => {
    return models;
  };

  return {
    currentModel,
    setCurrentModel,
    getModelList,
  };
};
