import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type GardenPlot = {
  x: number;
  y: number;
  plant_id: number;
};

interface GardenAPI {
  plants: Plant[];
  garden: GardenPlot[];

  redeemPlant(id: number): void;
  plant(id: number, x: number, y: number): void;
  getPlant(id: number): Plant;
  getGardenPlot(x: number, y: number): Plant;
  clearGarden(): void;
  clearPlants(): void;
}

export type Plant = {
  id: number;
  name: string;
  description: string;
  obtained: boolean;
  level: number;
  obtained_at: string;
  planted: boolean;
};

export const ALL_PLANTS: Plant[] = [
  {
    id: 1,
    name: "Aloe Vera",
    description: "Obtained by keeping balanced glucose for a day",
    obtained: false,
    obtained_at: "",
    planted: false,
    level: 1,
  },
  {
    id: 2,
    name: "Weeping Bonsai",
    description: "Stay hydrated for 8 days straight",
    obtained: false,
    obtained_at: "",
    planted: false,
    level: 1,
  },
  {
    id: 3,
    name: "Perfect Daisy",
    description: "Have all stats perfect for a day",
    obtained: false,
    obtained_at: "",
    planted: false,
    level: 1,
  },
  {
    id: 4,
    name: "Carrion Flower",
    description: "Reach a 1 year streak",
    obtained: false,
    obtained_at: "",
    planted: false,
    level: 1,
  },
  {
    id: 5,
    name: "Olive Bonsai",
    description: "Rebalance glucose after a bad day",
    obtained: false,
    obtained_at: "",
    planted: false,
    level: 1,
  },
  {
    id: 6,
    name: "Lavender Field",
    description: "Run at least 30 mins for a week straight",
    obtained: false,
    obtained_at: "",
    planted: false,
    level: 1,
  },
  {
    id: 7,
    name: "Garlic",
    description: "Visit the cardiologist once",
    obtained: false,
    obtained_at: "",
    planted: false,
    level: 1,
  },
  {
    id: 8,
    name: "Ice Plant",
    description: "Complete 10 visits on time",
    obtained: false,
    obtained_at: "",
    planted: false,
    level: 1,
  },
];

export const useGarden = create<GardenAPI>()(
  persist(
    (set, get) => ({
      plants: ALL_PLANTS,
      garden: [],

      // -------------------------
      // Redeem / Unlock Plant
      // -------------------------
      redeemPlant: (id: number) => {
        set((state) => ({
          plants: state.plants.map((p) =>
            p.id === id
              ? {
                  ...p,
                  obtained: true,
                  level: p.level + 1,
                  obtained_at: new Date().toISOString(),
                }
              : p,
          ),
        }));
      },

      // -------------------------
      // Plant into Garden
      // -------------------------
      plant: (id: number, x: number, y: number) => {
        const state = get();
        const plant = state.plants.find((p) => p.id === id);

        if (!plant || !plant.obtained) return;

        set({
          plants: state.plants.map((p) =>
            p.id === id ? { ...p, planted: true } : p,
          ),
          garden: [
            ...state.garden,
            {
              x,
              y,
              plant_id: id,
            },
          ],
        });
      },

      // -------------------------
      // Get Plant by ID
      // -------------------------
      getPlant: (id: number) => {
        return get().plants.find((p) => p.id === id)!;
      },

      // -------------------------
      // Get Garden Plot
      // -------------------------
      getGardenPlot: (x: number, y: number) => {
        const plot = get().garden.find((g) => g.x === x && g.y === y);

        if (!plot) return undefined as any;

        return get().plants.find((p) => p.id === plot.plant_id)!;
      },

      clearGarden: () => {
        set({
          garden: [],
        });
      },

      clearPlants: () => {
        const noPlants = get().plants.map((p) => ({ ...p, obtained: false }));
        set({ plants: noPlants });
      },
    }),
    {
      name: "garden",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
