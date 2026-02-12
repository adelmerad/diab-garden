import colors from "@/config/ui-colors";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: colors["primary"],
    paddingBottom: 32,
    paddingHorizontal: 24,
  },

  titleText: {
    color: colors["primary-foreground"],
    fontSize: 20,
    fontWeight: 600,
  },

  secondaryText: {
    color: colors["primary-foreground"],
    fontSize: 16,
    fontWeight: 400,
  },

  safeArea: {
    backgroundColor: colors["primary"],
  },
});

function Header(props: {
  options: {
    title?: string;
  };
}) {
  const [title, description] = props.options.title?.split("::") ?? [
    "Unkown Header",
    "Unkown Description",
  ];

  return (
    <SafeAreaView edges={["top"]} style={headerStyles.safeArea}>
      <View style={headerStyles.container}>
        <Text style={headerStyles.titleText}>{title}</Text>
        <Text style={headerStyles.secondaryText}>{description}</Text>
      </View>
    </SafeAreaView>
  );
}

export default Header;
