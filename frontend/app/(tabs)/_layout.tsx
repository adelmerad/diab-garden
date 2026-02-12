import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Header from "@/components/header";
import Feather from "@expo/vector-icons/Feather";

function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#38D4C2",
          headerShown: true,
          header: (props) => <Header options={props.options} />,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Welcome Back::Good luck on your journey",
            tabBarLabel: "Home",
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                color={color}
                name={focused ? "home" : "home-outline"}
                size={24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="records"
          options={{
            title:
              "Information Tracking::Track all your information and progress here",
            tabBarLabel: "Records",
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                color={color}
                name={focused ? "clipboard" : "clipboard-outline"}
                size={24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="progress"
          options={{
            title:
              "Progress::Check your progress in your daily tasks/achievements",
            tabBarLabel: "Progress",
            tabBarIcon: ({ focused, color }) => (
              <Fontisto color={color} name="heartbeat-alt" size={24} />
            ),
          }}
        />

        <Tabs.Screen
          name="garden"
          options={{
            title:
              "Garden::Plant and level up your garden to visualize your progress and dedication",
            tabBarLabel: "Garden",
            tabBarIcon: ({ focused, color }) => (
              <MaterialCommunityIcons
                color={color}
                name={focused ? "flower-tulip" : "flower-tulip-outline"}
                size={24}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile::Modify your prefrences and information here",
            tabBarLabel: "Profile",
            tabBarIcon: ({ focused, color }) => (
              <Feather color={color} name={"user"} size={24} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

export default TabsLayout;
