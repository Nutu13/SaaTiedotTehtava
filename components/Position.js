import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Weather from "./Weather";

export default function Position() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [msg, setMsg] = useState("Retrieving location...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);

      try {
        if (status !== "granted") {
          setMsg("Permission to access location was denied");
        } else {
          let position = await Location.getLastKnownPositionAsync({
            accuracy: Location.Accuracy.High,
          });
          console.log(position);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setMsg("Location retrieved");
        }
      } catch (error) {
        setMsg("Error retrieving location");
        console.log(error);
      }
      setIsLoading(false);
      //console.log("isLoading", isLoading);
    })();
  }, []);

  return (
    <View>
      <Text style={styles.coords}>
        {latitude.toFixed(3)},{longitude.toFixed(3)}
      </Text>
      <Text style={styles.message}>{msg}</Text>
      {isLoading === false && (
        <Weather latitude={latitude} longitude={longitude} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  coords: {
    fontSize: 20,
    marginBottom: 20,
  },
  message: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
});
