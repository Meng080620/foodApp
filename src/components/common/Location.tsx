import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Icons from "../icons";

const Location = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapperLocation}>
        <View style={styles.locationIcon}>
          <Icons name="heart" size={24} />
        </View>
        <View>
          <Text style={styles.locationMap}>Location 10MC</Text>
          <Text style={styles.locationCountry}>Phnom Penh</Text>
        </View>
      </View>
      <Icons name="heartfill" size={24} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor : 'red'
  },
  wrapperLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationMap: {
    fontSize: 16,
    fontWeight: "bold",
  },
  locationCountry: {
    fontWeight: "medium",
    fontSize: 12,
  },
  locationIcon :{
    marginRight : 8
  }
});

export default Location;
