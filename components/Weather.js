import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const api = {
  key: process.env.EXPO_PUBLIC_API_KEY,
  url: process.env.EXPO_PUBLIC_API_URL,
  icons: process.env.EXPO_PUBLIC_ICONS_URL,
};

export default function Weather(props) {
  const [temp, setTemp] = useState(0);
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    const url =
      api.url +
      "lat=" +
      props.latitude +
      "&lon=" +
      props.longitude +
      "&units=metric" +
      "&appid=" +
      api.key;

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setTemp(json.main.temp);
        setDescription(json.weather[0].description);
        setIcon(api.icons + json.weather[0].icon + "@2x.png");
      })
      .catch((error) => {
        setDescription("Error retriving weather information.");
        console.log(error);
      });
  }, []);

  return (
    <View>
      <Text style={styles.temp}>{temp} Celsius</Text>
      {icon && <Image source={{ uri: icon }} style={styles.icon} />}
      <Text style={styles.temp}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  temp: {
    fontSize: 20,
    marginBottom: 20,
  },
  icon: {
    width: 200,
    height: 200,
    borderWidth: 4,
    padding: 20,
    borderColor: "black",
    borderRadius: 20,
    backgroundColor: "#c7cafb",
  },
});
