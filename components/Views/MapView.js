import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, Polygon } from "react-native-maps";

export default function MapVieww() {
  const navigation = useNavigation();
  // 구역 데이터
  const regions = [
    {
      id: 1,
      coordinates: [
        { latitude: 37.5265, longitude: 126.9265 },
        { latitude: 37.5265, longitude: 126.9305 },
        { latitude: 37.5285, longitude: 126.9305 },
        { latitude: 37.5285, longitude: 126.9265 },
      ],
      color: "rgba(255, 255, 0, 0.3)",
    },
    {
      id: 2,
      coordinates: [
        { latitude: 37.5265, longitude: 126.9265 },
        { latitude: 37.5265, longitude: 126.92 },
        { latitude: 37.5285, longitude: 126.92 },
        { latitude: 37.5285, longitude: 126.9265 },
      ],
      color: "rgba(0, 255, 0, 0.3)",
    },
    {
      id: 3,
      coordinates: [
        { latitude: 37.5305, longitude: 126.9265 },
        { latitude: 37.5305, longitude: 126.92 },
        { latitude: 37.5285, longitude: 126.92 },
        { latitude: 37.5285, longitude: 126.9265 },
      ],

      color: "rgba(0, 255, 0, 0.3)", // 빨강 (높은 혼잡도)
    },
    {
      id: 4,
      coordinates: [
        { latitude: 37.5305, longitude: 126.9265 },
        { latitude: 37.5305, longitude: 126.92 },
        { latitude: 37.5345, longitude: 126.92 },
        { latitude: 37.533, longitude: 126.9265 },
      ],
      color: "rgba(0, 255, 0, 0.3)", // 빨강 (높은 혼잡도)
    },

    {
      id: 5,
      coordinates: [
        { latitude: 37.5305, longitude: 126.9155 },
        { latitude: 37.5305, longitude: 126.92 },
        { latitude: 37.5345, longitude: 126.92 },
        { latitude: 37.5355, longitude: 126.9155 },
      ],
      color: "rgba(0, 255, 0, 0.3)", // 빨강 (높은 혼잡도)
    },
    {
      id: 6,
      coordinates: [
        { latitude: 37.5305, longitude: 126.9155 },
        { latitude: 37.5305, longitude: 126.92 },
        { latitude: 37.5285, longitude: 126.92 },
        { latitude: 37.5285, longitude: 126.9155 },
      ],
      color: "rgba(0, 255, 0, 0.3)", // 빨강 (높은 혼잡도)
    },
    {
      id: 7,
      coordinates: [
        { latitude: 37.5305, longitude: 126.9155 },
        { latitude: 37.5305, longitude: 126.91 },
        { latitude: 37.5285, longitude: 126.911 },
        { latitude: 37.5285, longitude: 126.9155 },
      ],
      color: "rgba(0, 255, 0, 0.3)", // 빨강 (높은 혼잡도)
    },
    {
      id: 8,
      coordinates: [
        { latitude: 37.5305, longitude: 126.9155 },
        { latitude: 37.5305, longitude: 126.91 },
        { latitude: 37.5355, longitude: 126.911 },
        { latitude: 37.5354, longitude: 126.9155 },
      ],
      color: "rgba(0, 255, 0, 0.3)", // 빨강 (높은 혼잡도)
    },
    {
      id: 9,
      coordinates: [
        { latitude: 37.5215, longitude: 126.9155 },
        { latitude: 37.5215, longitude: 126.914 },
        { latitude: 37.5285, longitude: 126.91 },
        { latitude: 37.5285, longitude: 126.9155 },
      ],
      color: "rgba(0, 255, 0, 0.3)", // 빨강 (높은 혼잡도)
    },
    {
      id: 10,
      coordinates: [
        { latitude: 37.5255, longitude: 126.9155 },
        { latitude: 37.5255, longitude: 126.92 },
        { latitude: 37.5285, longitude: 126.92 },
        { latitude: 37.5285, longitude: 126.9155 },
      ],
      color: "rgba(255, 255, 0, 0.3)", // 빨강 (높은 혼잡도)
    },
    {
      id: 11,
      coordinates: [
        { latitude: 37.5255, longitude: 126.9155 },
        { latitude: 37.5255, longitude: 126.92 },
        { latitude: 37.5205, longitude: 126.92 },
        { latitude: 37.5205, longitude: 126.9155 },
      ],
      color: "rgba(0, 255, 0, 0.3)", // 빨강 (높은 혼잡도)
    },
    {
      id: 12,
      coordinates: [
        { latitude: 37.5225, longitude: 126.92 },
        { latitude: 37.5225, longitude: 126.922 },
        { latitude: 37.5245, longitude: 126.922 },
        { latitude: 37.5245, longitude: 126.92 },
      ],
      color: "rgba(0, 255, 0, 0.3)", // 빨강 (높은 혼잡도)
    },
    {
      id: 13,
      coordinates: [
        { latitude: 37.5265, longitude: 126.92 },
        { latitude: 37.5265, longitude: 126.9245 },
        { latitude: 37.5245, longitude: 126.9245 },
        { latitude: 37.5245, longitude: 126.92 },
      ],
      color: "rgba(0, 255, 0, 0.3)", // 빨강 (높은 혼잡도)
    },

    {
      id: 14,
      coordinates: [
        { latitude: 37.5285, longitude: 126.9305 },
        { latitude: 37.5285, longitude: 126.9345 },
        { latitude: 37.531, longitude: 126.9305 },
        { latitude: 37.5305, longitude: 126.9305 },
      ],
      color: "rgba(255, 0, 0, 0.3)", // 주황 (중간 혼잡도)
    },
    {
      id: 15,
      coordinates: [
        { latitude: 37.5285, longitude: 126.9265 },
        { latitude: 37.5285, longitude: 126.9305 },
        { latitude: 37.531, longitude: 126.9305 },
        { latitude: 37.5305, longitude: 126.9265 },
      ],
      color: "rgba(255, 127, 0, 0.5)", // 초록 (낮은 혼잡도)

      // color: "rgba(0, 255, 0, 0.3)", // 초록 (낮은 혼잡도)
    },
    {
      id: 16,
      coordinates: [
        { latitude: 37.5305, longitude: 126.9265 },
        { latitude: 37.531, longitude: 126.9305 },
        { latitude: 37.5328, longitude: 126.9265 },
        { latitude: 37.5328, longitude: 126.9265 },
      ],
      color: "rgba(255, 255, 0, 0.3)", // 노랑 (보통 혼잡도)
    },
    {
      id: 17,
      coordinates: [
        { latitude: 37.5265, longitude: 126.9345 },
        { latitude: 37.5265, longitude: 126.9365 },
        { latitude: 37.5285, longitude: 126.9345 },
        { latitude: 37.5285, longitude: 126.9345 },
      ],
      color: "rgba(255, 0, 0, 0.3)", // 노랑 (보통 혼잡도)
    },
    {
      id: 18,
      coordinates: [
        { latitude: 37.5245, longitude: 126.9285 },
        { latitude: 37.5245, longitude: 126.9325 },
        { latitude: 37.5265, longitude: 126.9325 },
        { latitude: 37.5265, longitude: 126.9285 },
      ],
      color: "rgba(255, 255, 0, 0.3)", // 보라 (특정 혼잡도)
    },
    {
      id: 19,
      coordinates: [
        { latitude: 37.5265, longitude: 126.9245 },
        { latitude: 37.5265, longitude: 126.9285 },
        { latitude: 37.5245, longitude: 126.9285 },
        { latitude: 37.5245, longitude: 126.9245 },
      ],
      color: "rgba(255, 255, 0, 0.3)", // 청록 (매우 낮음)
    },
    {
      id: 20,
      coordinates: [
        // 노
        { latitude: 37.5265, longitude: 126.9305 },
        { latitude: 37.5265, longitude: 126.9345 },
        { latitude: 37.5285, longitude: 126.9345 },
        { latitude: 37.5285, longitude: 126.9305 },
      ],
      color: "rgba(255, 0, 0, 0.3)", // 보라 (특정 혼잡도)
    },
    {
      id: 21,
      coordinates: [
        // 노
        { latitude: 37.5225, longitude: 126.9345 },
        { latitude: 37.5225, longitude: 126.9305 },
        { latitude: 37.5205, longitude: 126.9305 },
        { latitude: 37.5205, longitude: 126.9345 },
      ],
      color: "rgba(0, 255, 0, 0.3)", // 보라 (특정 혼잡도)
    },
    {
      id: 22,
      coordinates: [
        // 노
        { latitude: 37.5225, longitude: 126.9345 },
        { latitude: 37.5225, longitude: 126.9305 },
        { latitude: 37.5245, longitude: 126.9305 },
        { latitude: 37.5245, longitude: 126.9345 },
      ],
      color: "rgba(255, 255, 0, 0.3)", // 청록?? (매우 낮음)
    },
    {
      id: 23,
      coordinates: [
        // 노
        { latitude: 37.5225, longitude: 126.9415 },
        { latitude: 37.5225, longitude: 126.9385 },
        { latitude: 37.5245, longitude: 126.9385 },
        { latitude: 37.5245, longitude: 126.939 },
      ],
      color: "rgba(255, 127, 0, 0.7)", // 초록 (낮은 혼잡도)
      // color: "rgba(255, 255, 0, 0.3)", // 노랑 (보통 혼잡도)
    },
    {
      id: 24,
      coordinates: [
        // 노
        { latitude: 37.5225, longitude: 126.9385 },
        { latitude: 37.5225, longitude: 126.9345 },
        { latitude: 37.5245, longitude: 126.9345 },
        { latitude: 37.5245, longitude: 126.9385 },
      ],
      // color: "rgba(255, 255, 0, 0.3)", // 노랑 (보통 혼잡도)
      color: "rgba(255, 0, 0, 0.3)", // 청록 (매우 낮음)
    },
    {
      id: 25,
      coordinates: [
        // 노
        { latitude: 37.5225, longitude: 126.9385 },
        { latitude: 37.5225, longitude: 126.9345 },
        { latitude: 37.5205, longitude: 126.9345 },
        { latitude: 37.5205, longitude: 126.9385 },
      ],
      // color: "rgba(255, 255, 0, 0.3)", // 노랑 (보통 혼잡도)
      color: "rgba(255, 0, 0, 0.3)", // 청록 (매우 낮음)
    },

    {
      id: 26,
      coordinates: [
        // 노
        { latitude: 37.5265, longitude: 126.9365 },
        { latitude: 37.5265, longitude: 126.9325 },
        { latitude: 37.5245, longitude: 126.9325 },
        { latitude: 37.5245, longitude: 126.939 },
      ],
      // color: "rgba(255, 255, 0, 0.3)", // 노랑 (보통 혼잡도)
      color: "rgba(255, 127, 0, 0.7)", // 초록 (낮은 혼잡도)
    },

    {
      id: 27,
      coordinates: [
        // 노
        { latitude: 37.5225, longitude: 126.9305 },
        { latitude: 37.5225, longitude: 126.927 },
        { latitude: 37.5245, longitude: 126.927 },
        { latitude: 37.5245, longitude: 126.9305 },
      ],
      // color: "rgba(255, 255, 0, 0.3)", // 노랑 (보통 혼잡도)
      color: "rgba(255, 255, 0, 0.3)", // 청록 (매우 낮음)
    },
    {
      id: 28,
      coordinates: [
        // 노
        { latitude: 37.5205, longitude: 126.922 },
        { latitude: 37.5205, longitude: 126.927 },
        { latitude: 37.5225, longitude: 126.927 },
        { latitude: 37.5225, longitude: 126.922 },
      ],
      color: "rgba(0, 255, 0, 0.3)", // 노랑 (보통 혼잡도)
      // color: "rgba(255, 0, 0, 0.3)", // 청록 (매우 낮음)
    },
    {
      id: 29,
      coordinates: [
        // 노
        { latitude: 37.5225, longitude: 126.922 },
        { latitude: 37.5225, longitude: 126.927 },
        { latitude: 37.5245, longitude: 126.927 },
        { latitude: 37.5245, longitude: 126.922 },
      ],
      color: "rgba(0, 255, 0, 0.3)", // 초록 (낮은 혼잡도)
    },

    {
      id: 30,
      coordinates: [
        // 노
        { latitude: 37.5205, longitude: 126.922 },
        { latitude: 37.5205, longitude: 126.92 },
        { latitude: 37.5225, longitude: 126.92 },
        { latitude: 37.5225, longitude: 126.922 },
      ],
      color: "rgba(0, 255, 0, 0.3)", // 초록 (낮은 혼잡도)
    },
    {
      id: 31,
      coordinates: [
        // 노
        { latitude: 37.5205, longitude: 126.927 },
        { latitude: 37.5205, longitude: 126.9305 },
        { latitude: 37.5225, longitude: 126.9305 },
        { latitude: 37.5225, longitude: 126.927 },
      ],
      color: "rgba(0, 255, 0, 0.3)", // 초록 (낮은 혼잡도)
    },
    {
      id: 32,
      coordinates: [
        // 노
        { latitude: 37.5165, longitude: 126.927 },
        { latitude: 37.5165, longitude: 126.9305 },
        { latitude: 37.5205, longitude: 126.9305 },
        { latitude: 37.5205, longitude: 126.927 },
      ],
      color: "rgba(0, 255, 0, 0.3)", // 초록 (낮은 혼잡도)
    },
    {
      id: 33,
      coordinates: [
        // 노
        { latitude: 37.5165, longitude: 126.923 },
        { latitude: 37.5165, longitude: 126.927 },
        { latitude: 37.5205, longitude: 126.927 },
        { latitude: 37.5205, longitude: 126.923 },
      ],
      color: "rgba(0, 255, 0, 0.3)", // 초록 (낮은 혼잡도)
    },
    {
      id: 34,
      coordinates: [
        // 노
        { latitude: 37.5165, longitude: 126.9305 },
        { latitude: 37.5165, longitude: 126.935 },
        { latitude: 37.5205, longitude: 126.935 },
        { latitude: 37.5205, longitude: 126.9305 },
      ],
      color: "rgba(0, 255, 0, 0.3)", // 초록 (낮은 혼잡도)
    },
    {
      id: 35,
      coordinates: [
        // 노
        { latitude: 37.5165, longitude: 126.935 },
        { latitude: 37.5165, longitude: 126.94 },
        { latitude: 37.5205, longitude: 126.94 },
        { latitude: 37.5205, longitude: 126.935 },
      ],
      // color: "rgba(0, 255, 0, 0.3)", // 초록 (낮은 혼잡도)
    },
    {
      id: 36,
      coordinates: [
        // 노
        { latitude: 37.5165, longitude: 126.935 },
        { latitude: 37.5165, longitude: 126.945 },
        { latitude: 37.5205, longitude: 126.94 },
        { latitude: 37.5205, longitude: 126.935 },
      ],
      // color: "rgba(255, 100, 0, 0.3)", // 초록 (낮은 혼잡도)
      color: "rgba(255, 255, 0, 0.3)", // 초록 (낮은 혼잡도)
    },
    {
      id: 37,
      coordinates: [
        // 노
        { latitude: 37.5205, longitude: 126.9385 },
        { latitude: 37.5205, longitude: 126.944 },
        { latitude: 37.5225, longitude: 126.942 },
        { latitude: 37.5225, longitude: 126.9385 },
      ],
      color: "rgba(255, 0, 0, 0.3)", // 초록 (낮은 혼잡도)
    },
    {
      id: 38,
      coordinates: [
        // 노
        { latitude: 37.5205, longitude: 126.94 },
        { latitude: 37.5205, longitude: 126.944 },
        { latitude: 37.517, longitude: 126.9443 },
        { latitude: 37.519, longitude: 126.942 },
      ],
      color: "rgba(255, 127, 0, 0.7)", // 초록 (낮은 혼잡도)

      // color: "rgba(255, 255, 0, 0.3)", // 초록 (낮은 혼잡도)
    },
    {
      id: 39,
      coordinates: [
        // 노
        { latitude: 37.5205, longitude: 126.918 },
        { latitude: 37.5205, longitude: 126.923 },
        { latitude: 37.517, longitude: 126.923 },
        { latitude: 37.519, longitude: 126.918 },
      ],
      color: "rgba(0, 255, 0, 0.3)", // 초록 (낮은 혼잡도)
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>실시간 📹</Text>
        <Text style={styles.text}>🔴경고🟠주의🟡관심🟢여유</Text>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.5295, // 여의나루역 근처
          longitude: 126.9295,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {/* 구역 표시 */}
        {regions.map((region) => (
          <Polygon
            key={region.id}
            coordinates={region.coordinates}
            fillColor={region.color}
            strokeColor="rgba(255,255,255,0.5)"
            strokeWidth={1}
            tappable={true}
            onPress={() =>
              navigation.navigate("RegionDetails", { region: region })
            }
          />
        ))}

        {/* 마커 */}
        <Marker
          coordinate={{ latitude: 37.5265, longitude: 126.9295 }}
          title="여의나루역"
          description="혼잡도가 높은 지역입니다."
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "right",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  timeContainer: {
    backgroundColor: "#F5F5F7",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  timeText: {
    fontSize: 16,
    // textAlign: "center",
  },
  maintitle: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 45,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tabButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  tabButtonText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  activeTabButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  map: {
    flex: 1,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  infoText: {
    fontSize: 18,
    marginVertical: 10,
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  subTabContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  subTabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    marginHorizontal: 5,
  },
  subTabButtonText: {
    fontSize: 14,
    color: "#666",
  },
  activeSubTabButton: {
    backgroundColor: "#d8eafc",
  },
  activeSubTabButtonText: {
    color: "#007aff",
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  rankContainer: {
    width: 30,
    alignItems: "center",
  },
  rank: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  location: {
    fontSize: 14,
    color: "#666",
  },
  statusContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
  },
  statusIndicator: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
  },
});
