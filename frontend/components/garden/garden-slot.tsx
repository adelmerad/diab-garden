import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Plant, useGarden } from "@/lib/garden/use-garden";
import { PLANT_IMAGES } from "@/lib/garden/plant_images";

export const getPlantImage = (id: number) => {
  return PLANT_IMAGES[id];
};
export default function GardenSlot({
  x,
  y,
  onPlantPress,
}: {
  x: number;
  y: number;
  onPlantPress: (p: Plant | undefined) => void;
}) {
  const garden = useGarden((s) => s.garden);
  const plants = useGarden((s) => s.plants);

  const plot = garden.find((g) => g.x === x && g.y === y);
  const plant = plot ? plants.find((p) => p.id === plot.plant_id) : undefined;

  return (
    <View
      style={{
        width: "25%",
        height: "25%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => onPlantPress(plant)}>
        <Image
          source={getPlantImage(plant?.id ?? 0)}
          style={{ width: 60, height: 60 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}
