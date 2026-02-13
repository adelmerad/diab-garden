import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import GardenSlot from "./garden-slot";
import { Plant } from "@/lib/garden/use-garden";

const GRID_SIZE = 4;

export default function GardenGrid({
  onPlantPress,
  onLayoutReady,
}: {
  onPlantPress: (p: Plant | undefined) => void;
  onLayoutReady: (o: any) => void;
}) {
  const gridRef = useRef<View>(null);
  const slots = [];

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      slots.push(
        <GardenSlot
          key={`${x}-${y}`}
          x={x}
          y={y}
          onPlantPress={onPlantPress}
        />,
      );
    }
  }

  useEffect(() => {
    setTimeout(() => {
      gridRef.current?.measureInWindow((x, y, w, h) => {
        onLayoutReady({ x, y, w, h });
      });
    }, 0);
  }, []);

  return (
    <View
      ref={gridRef}
      style={{
        width: 320,
        height: 320,
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {slots}
    </View>
  );
}
