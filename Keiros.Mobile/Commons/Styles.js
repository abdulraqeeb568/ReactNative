import { red } from "color-name";
import { StyleSheet } from "react-native";
export const Styles = StyleSheet.create({
  inputField: {
    borderRadius: 10,
    width: "100%",
    height: 60,
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#4165AE",
    marginTop: 10,
  },
  invalidText: {
    textAlign: "center",
    marginTop: 10,
    marginHorizontal: 20,
    fontSize: 16,
    color: "red",
  },
  validText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    color: "green",
  },
  TextInput: {
    height: 55,
    fontSize: 18,
    padding: 10,
  },
  TextInputPasswordUpdate: {
    height: 55,
    fontSize: 18,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  header: {
    height: "30%",
    margin: 0,
    passing: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  headerSupport: {
    height: "20%",
    margin: 0,
    passing: 0,
    alignItems: "center",
  },
  logoImage: {
    height: "100%",
    resizeMode: "contain",
  },
  logoImageSupport: {
    height: "100%",
    resizeMode: "contain", // Adjust this based on your preference: "contain" or "cover"
  },
  button: {
    width: "100%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#4165AE",
  },
  buttonSupport: {
    width: "100%",
    borderRadius: 10,
    height: 80,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  passwordIconView: {
    width: "10%",
  },
  ViewUpdatePassword: {
    borderRadius: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    borderWidth: 3,
    borderColor: "#4165AE",
    marginTop: 10,
    paddingRight: 10,
  },
  ViewUploadImage: {
    borderRadius: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    borderWidth: 3,
    borderColor: "#4165AE",
    marginTop: 10,
    paddingHorizontal: 5,
  },
  ViewSettingsScreen: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  navigationButtons: {
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    marginVertical: 5,
    ...Platform.select({
      android: {
        elevation: 5, // Shadow for Android
      },
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4, // Shadow for iOS
      },
    }),
  },
  spinnerTextStyle: {
    color: "black",
  },
  phoneNumberContainer: {
    width: "100%",
    borderWidth: 3,
    borderColor: "#4165AE",
    borderRadius: 10,
    marginTop: 10,
    height: 60,
    justifyContent: "flex-end",
  },
  h4: {
    fontSize: 24, // Adjust the size as needed
    fontWeight: "bold", // Apply the desired font weight
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "center",
  },
  h3: {
    fontSize: 20, // Adjust the size as needed
    fontWeight: "bold", // Apply the desired font weight
    padding: "10px",
  },
  h2: {
    fontSize: 18, // Adjust the size as needed
    fontWeight: "bold", // Apply the desired font weight
  },
  h1: {
    fontSize: 16, // Adjust the size as needed
    fontWeight: "bold", // Apply the desired font weight
  },
  link: {
    color: "blue", // Set the text color to blue or any color you prefer
    textDecorationLine: "underline", // Underline the link text
    paddingVertical: 10,
  },
  text: { paddingVertical: 10 },
  bodyContainer: {
    width: "95%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: "center",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
  listContent: {
    width: "80%",
    padding: 5,
  },
  listItemFont: {
    fontWeight: "500",
    color: "#36454F",
  },
  listItemIcon: {
    fontSize: 22,
    color: "#36454F",
    alignSelf: "flex-end",
  },
  listItemIconContainer: {
    width: "20%",
    justifyContent: "center",
  },
});
