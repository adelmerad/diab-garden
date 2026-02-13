import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  PanResponder,
  Animated,
  TouchableOpacity,
  Text,
} from "react-native";
import { useGarden } from "@/lib/garden/use-garden";
import { getPlantImage } from "./garden-slot";
import colors from "@/config/ui-colors";

function DraggablePlant({ plant, onDrop, layout }: any) {
  const pan = React.useRef(new Animated.ValueXY()).current;

  const responder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (_, gesture) => {
      if (!layout) return;

      const { x, y, w, h } = layout;

      const cellWidth = w / 4;
      const cellHeight = h / 4;

      const relativeX = gesture.moveX - x;
      const relativeY = gesture.moveY - y;

      if (relativeX < 0 || relativeY < 0 || relativeX > w || relativeY > w) {
        pan.setValue({ x: 0, y: 0 });
        return;
      }

      const gridX = Math.floor(relativeX / cellWidth);
      const gridY = Math.floor(relativeY / cellHeight);

      onDrop(gridX, gridY);

      pan.setValue({ x: 0, y: 0 });
    },
  });

  return (
    <Animated.View
      {...responder.panHandlers}
      style={{ transform: pan.getTranslateTransform() }}
    >
      <Image
        source={getPlantImage(plant.id ?? 0)}
        style={{ width: 60, height: 60 }}
      />
    </Animated.View>
  );
}

export default function InventoryDock({ close, layout }: any) {
  const { plants, garden, plant } = useGarden();

  const aquiredPlants = plants.filter((p) => p.obtained);

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 120,
        backgroundColor: "#fff",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {aquiredPlants.map((p) => (
          <DraggablePlant
            key={p.id}
            plant={p}
            layout={layout}
            onDrop={(x: number, y: number) => {
              plant(p.id, x, y);
            }}
          />
        ))}
      </View>
      <TouchableOpacity
        onPress={close}
        style={{
          marginTop: 16,
          alignSelf: "center",
          borderWidth: 1,
          borderColor: colors.primary,
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 12,
        }}
      >
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  );
}
