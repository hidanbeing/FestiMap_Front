import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { routeDatas } from "../../components/data/RouteDatas";

export default function EscapeScreen({ navigation }) {
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);

  // routeDatas를 [ { latitude, longitude }... ] 형태로 변환
  const routes = routeDatas.map((routeArray) =>
    routeArray.map(([lat, lng]) => ({
      latitude: lat,
      longitude: lng,
    }))
  );

  return (
    <View style={styles.container}>
      {/* 상단 헤더 영역 */}
      <View style={styles.header}>
        {/* 뒤로가기 버튼 */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.maintitle}>대피 경로 추천</Text>
      </View>

      {/* 지도 영역 */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.524087,
          longitude: 126.925426,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* 시작 마커 */}
        <Marker
          coordinate={{ latitude: 37.524087, longitude: 126.925426 }}
          title="출발"
          description="여의도 불꽃놀이 축제 위치"
        />

        {/* 2개의 경로 표시 + 끝나는 지점 마커 */}
        {routes.map((route, index) => {
          // 선택된 경로는 빨간색, 선택되지 않은 경로는 회색
          const color = selectedRouteIndex === index ? "red" : "gray";
          const color2 = selectedRouteIndex === index ? "#007bff" : "gray";
          return (
            <View key={`route-${index}`}>
              <Polyline
                coordinates={route}
                strokeColor={color}
                strokeWidth={5}
              />

              {/* 끝나는 경로 지점 마커 */}
              <Marker
                coordinate={route[route.length - 1]}
                pinColor={color2} // 끝나는 지점 마커도 경로 색상에 맞춰 표시
                title="도착"
                description={`경로 ${index + 1} 도착 지점`}
              />
            </View>
          );
        })}
      </MapView>

      {/* 하단 경로 선택 박스 (2개) */}
      <View style={styles.bottomBar}>
        {routes.map((_, index) => {
          const isSelected = selectedRouteIndex === index;
          const boxColor = isSelected ? "#007bff" : "#ffffff";
          const textColor = isSelected ? "#fff" : "#000";

          // 예시로 보여줄 경로 정보
          const routeInfo =
            index === 0
              ? {
                  time: "10분",
                  distance: "709.9m",
                  description: "가장 가까운 경로",
                  description2: "약간 혼잡",
                }
              : {
                  time: "13분",
                  distance: "828m",
                  description: "가장 안전한 경로",
                  description2: "원활",
                };

          return (
            <TouchableOpacity
              key={index}
              style={[styles.routeInfoBox, { backgroundColor: boxColor }]}
              onPress={() => setSelectedRouteIndex(index)}
            >
              <Text style={[styles.routeTitle, { color: textColor }]}>
                {routeInfo.description}
              </Text>
              <Text style={[styles.routeDescription, { color: textColor }]}>
                {routeInfo.description2}
              </Text>

              {/* 시간을 더 크게 표시 */}
              <Text style={[styles.routeTime, { color: textColor }]}>
                {routeInfo.time}
              </Text>

              <Text style={[styles.routeDescription, { color: textColor }]}>
                거리: {routeInfo.distance}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // 상단 헤더 영역 스타일
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 70, // 상태바 + 약간의 여유
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  // 뒤로가기 버튼
  backButton: {
    marginRight: 10,
  },
  maintitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomBar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 2,
  },
  routeInfoBox: {
    width: 140,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  routeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  routeDescription: {
    fontSize: 14,
    marginBottom: 3,
  },
  routeTime: {
    fontSize: 22, // 시간을 크게 표시
    fontWeight: "bold",
    marginBottom: 5,
  },
});
