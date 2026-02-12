import React, { useState } from "react";
import { View, ImageBackground, TouchableOpacity, Text } from "react-native";
import { Plant, useGarden } from "@/lib/garden/use-garden";
import GardenGrid from "@/components/garden/garden-grid";
import InventoryDock from "@/components/garden/inventory-dock";
import PlantInfoDock from "@/components/garden/plant-info-dock";
import colors from "@/config/ui-colors";

const GARDEN_BG_PATH = require("../../assets/garden_background.jpg");

export default function Garden() {
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<Plant | undefined>(
    undefined,
  );
  const [gridLayout, setGridLayout] = useState(null);
  const clearGarden = useGarden((s) => s.clearGarden);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={GARDEN_BG_PATH}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        resizeMode="cover"
      >
        <View>
          <GardenGrid
            onPlantPress={setSelectedPlant}
            onLayoutReady={setGridLayout}
          />
        </View>
      </ImageBackground>

      <View
        style={{
          position: "absolute",
          bottom: 20,
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={() => setInventoryOpen((v) => !v)}
          style={{
            paddingHorizontal: 30,
            paddingVertical: 14,
            borderWidth: 2,
            borderRadius: 14,
          }}
        >
          <Text>Inventory</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={clearGarden}
          style={{
            paddingHorizontal: 30,
            paddingVertical: 14,
            borderWidth: 2,
            borderRadius: 14,
            borderColor: colors.danger,
          }}
        >
          <Text>Clear Plot</Text>
        </TouchableOpacity>
      </View>

      {inventoryOpen && (
        <InventoryDock
          close={() => setInventoryOpen(false)}
          layout={gridLayout}
        />
      )}
      {selectedPlant && (
        <PlantInfoDock
          plant={selectedPlant}
          onClose={() => setSelectedPlant(undefined)}
        />
      )}
    </View>
  );
}
