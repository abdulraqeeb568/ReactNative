import React, { useLayoutEffect } from "react";
import {
  ScrollView,
  Image,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { Styles } from "../../Commons/Styles";

const HelpScreen = ({ navigation }) => {
  const liveChatPressed = () => {};
  const sendEmailPressed = () => {};
  const faqPressed = () => {};
  const handleLinkPress = () => {
    // Define the URL you want to open when the link is pressed
    const url = "https://www.powersoft19.com/";

    // Use Linking.openURL to open the URL in the device's default browser
    Linking.openURL(url);
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Help",
    });
  }, [navigation]);
  return (
    <ScrollView>
      <Text style={Styles.h4}>Support</Text>
      <View style={Styles.headerSupport}>
        <Image
          style={Styles.logoImageSupport}
          source={require("../..//assets/ic_elit_logo.png")}
        />
      </View>
      <Text style={Styles.h4}>Hello, How can we help you?</Text>
      <TouchableOpacity style={Styles.buttonSupport} onPress={liveChatPressed}>
        <Text
          style={{
            color: "#585C72",
            backgroundColor: "red",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Live chat
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HelpScreen;
