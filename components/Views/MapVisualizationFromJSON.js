import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import * as d3 from "d3-scale";
import jsonData from "../../assets/csv/csvjson.json"; // JSON 파일로 대체

const MapVisualizationFromJSON = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 데이터 로드
    const loadData = async () => {
      try {
        // JSON 데이터 로드
        const parsedData = jsonData.map((row) => ({
          startLat: parseFloat(row["노드Y좌표"]),
          startLng: parseFloat(row["노드X좌표"]),
          endLat: parseFloat(row["다음노드Y좌표"]),
          endLng: parseFloat(row["다음노드X좌표"]),
          flow: parseFloat(row["유동인구"]),
        }));
        setData(parsedData);
        setLoading(false);
      } catch (error) {
        console.error("Error loading JSON data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // 색상 매핑 함수
  const minFlow = Math.min(...data.map((d) => d.flow));
  const maxFlow = Math.max(...data.map((d) => d.flow));

  const colorScale = d3
    .scaleLinear()
    .domain([minFlow, (minFlow + maxFlow) / 40, (minFlow + maxFlow) / 2]) // 초록 -> 노랑 -> 빨강
    .range(["#33CC33", "#FFCC00", "#FF0000"]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="darkblue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 현재 시간 표시 */}

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.5265, // 여의나루역 중심 좌표
          longitude: 126.9295,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        minZoomLevel={16} // 최소 줌 레벨
        maxZoomLevel={16} // 최대 줌 레벨
        // onRegionChangeComplete={(region) => {
        //   setMapRegion(region); // 지도 뷰포트 변경 시 업데이트
        // }}
      >
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>실시간</Text>
          <Text style={styles.text}>🔴경고🟠주의🟡관심🟢여유</Text>
        </View>
        {data.map((item, index) => {
          const color = colorScale(item.flow); // 색상 계산
          return (
            <Polyline
              key={index}
              coordinates={[
                { latitude: item.startLat, longitude: item.startLng },
                { latitude: item.endLat, longitude: item.endLng },
              ]}
              strokeColor={color}
              strokeWidth={5}
            />
          );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "right",
  },
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height - 50, // 시간 표시 영역 고려
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});

export default MapVisualizationFromJSON;
