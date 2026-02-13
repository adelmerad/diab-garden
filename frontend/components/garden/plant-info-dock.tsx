import colors from "@/config/ui-colors";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function PlantInfoDock({ plant, onClose }: any) {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: 20,
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "600" }}>{plant.name}</Text>

      <Text style={{ marginTop: 8 }}>{plant.description}</Text>

      <TouchableOpacity
        onPress={onClose}
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
