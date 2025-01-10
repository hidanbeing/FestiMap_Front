import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, Polygon } from "react-native-maps";
import { regions as regions1, markers as markers1 } from "../data/MapData";
import { regions as regions2, markers as markers2 } from "../data/MapData2";
import Toggle from "react-native-toggle-element";
import ToggleSwitch from "toggle-switch-react-native";

export default function MapVieww() {
  const navigation = useNavigation();
  const [toggleValue, setToggleValue] = useState(false);
  const [currentData, setCurrentData] = useState({
    regions: regions1,
    markers: markers1,
  });

  const toggleData = () => {
    setCurrentData((prevState) =>
      prevState.regions === regions1
        ? { regions: regions2, markers: markers2 }
        : { regions: regions1, markers: markers1 }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {toggleValue ? (
          <Text style={styles.text}>
            <Text style={{ fontWeight: "bold" }}>혼잡도 지도</Text>{" "}
          </Text>
        ) : (
          <Text style={styles.text}>
            <Text style={{ fontWeight: "bold" }}>위험도 지도</Text>{" "}
            🔴경고🟠주의🟡관심🟢여유
          </Text>
        )}

        <ToggleSwitch
          isOn={toggleValue}
          onColor="red"
          offColor="green"
          size="small"
          onToggle={() => {
            setToggleValue(!toggleValue);
            toggleData();
          }}
        />
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.5265,
          longitude: 126.9295,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* 구역 표시 */}
        {currentData.regions.map((region) => (
          <Polygon
            key={region.id}
            coordinates={region.coordinates}
            fillColor={region.color}
            strokeColor="rgba(255,255,255,0.5)"
            strokeWidth={1}
          />
        ))}

        {/* 마커 표시 */}
        {currentData.markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            // title={marker.title}
            // description={marker.description}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "#F5F5F7",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
  toggleButton: {
    backgroundColor: "#007bff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  toggleButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  map: {
    flex: 1,
  },
});
