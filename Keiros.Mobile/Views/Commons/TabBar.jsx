import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import SignInScreen from "../SignIn";
import Settings from "./SettingsScreen";
import UserFeed from "../User_Views/UserFeed";
import UserHomeScreen from "../User_Views/UserHomeScreen";
import DriverFeed from "../Driver_Views/DriverFeed";
import DriverHomeScreen from "../Driver_Views/DriverHomeScreen";
import Constants from "../../Commons/Constants";

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Notifications!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const MyTabs = ({ navigation, route }) => {
  const role = route.params.role;
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={
          role === Constants.Roles[1]
            ? DriverHomeScreen
            : role === Constants.Roles[2]
            ? UserHomeScreen
            : UserHomeScreen
        }
        initialParams={{ route: route }}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        initialParams={{ route: route }}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default MyTabs;
