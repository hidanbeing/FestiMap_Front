import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import MapView, { Marker } from "react-native-maps";

export default function DetailInfoScreen({ route }) {
  const { name, location, status, distance } = route.params;
  // 화면 너비
  const screenWidth = Dimensions.get("window").width;

  return (
    <ScrollView style={styles.container}>
      {/* 상단 정보 */}
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.distance}>지금 위치에서 {distance}km</Text>
        <Text
          style={[
            styles.status,
            status === "red"
              ? styles.statusRed
              : status === "yellow"
              ? styles.statusYellow
              : styles.statusGreen,
          ]}
        >
          {status === "red"
            ? "혼잡도가 높음"
            : status === "yellow"
            ? "혼잡도가 보통"
            : "혼잡도가 낮음"}
        </Text>
      </View>

      {/* 장소 혼잡도 그래프 */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>장소 혼잡도</Text>
        <Text style={styles.chartTitle}>[2024년 기준]</Text>
        <BarChart
          data={{
            labels: [
              "11시",
              "12시",
              "13시",
              "14시",
              "15시",
              "16시",
              "17시",
              "18시",
              "19시",
              "20시",
              "21시",
              "22시",
            ],
            datasets: [
              {
                data: [30, 40, 50, 60, 80, 100, 120, 140, 130, 110, 90, 70], // 막대그래프 데이터
              },
            ],
          }}
          width={screenWidth - 40} // 그래프 너비
          height={200} // 그래프 높이
          yAxisSuffix="명"
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            barPercentage: 0.5,
            propsForHorizontalLabels: {
              display: "none",
            },
          }}
          verticalLabelRotation={30}
          style={styles.chart}
        />
        <Text style={styles.chartTitle}>[실시간]</Text>
        <LineChart
          data={{
            labels: ["11시", "12시", "13시", "14시", "15시", "16시"],
            datasets: [
              {
                data: [20, 30, 50, 70, 90, 110], // 선 그래프 데이터
              },
            ],
          }}
          width={screenWidth - 40}
          height={200}
          yAxisSuffix="명"
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForHorizontalLabels: {
              display: "none",
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      {/* 방문자 연령분포 그래프 */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>방문자 연령분포 (성별)</Text>
        <ScrollView horizontal>
          <View style={{ flexDirection: "row" }}>
            {/* 남성 데이터 */}
            <BarChart
              data={{
                labels: [
                  "10대",
                  "20대",
                  "30대",
                  "40대",
                  "50대",
                  "60대",
                  "70대 이상",
                ],
                datasets: [
                  {
                    data: [10, 30, 50, 40, 20, 10, 5],
                  },
                ],
              }}
              width={screenWidth / 2} // 그래프 너비 조정
              height={200}
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`, // 파란색
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                barPercentage: 0.5,
                propsForHorizontalLabels: {
                  display: "none",
                },

                propsForVerticalLabels: {
                  fontSize: 8, // 세로 라벨 폰트 크기
                },
              }}
              verticalLabelRotation={30}
              barPercentage={0.5} // 막대 폭 조절
              style={styles.chart}
            />
            {/* 여성 데이터 */}
            <BarChart
              data={{
                labels: [
                  "10대",
                  "20대",
                  "30대",
                  "40대",
                  "50대",
                  "60대",
                  "70대 이상",
                ],
                datasets: [
                  {
                    data: [15, 40, 60, 30, 25, 15, 18],
                  },
                ],
              }}
              width={screenWidth / 2} // 그래프 너비 조정
              height={200}
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // 빨간색
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                barPercentage: 0.5,
                propsForHorizontalLabels: {
                  display: "none",
                },
                propsForVerticalLabels: {
                  fontSize: 8, // 세로 라벨 폰트 크기
                },
              }}
              verticalLabelRotation={30}
              barPercentage={0.5} // 막대 폭 조절
              style={styles.chart}
            />
          </View>
        </ScrollView>
      </View>
      {/* 지도 */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>위치 정보</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.5265, // 여의나루역 중심 좌표
            longitude: 126.9305,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <Marker
            coordinate={{ latitude: 37.5265, longitude: 126.9305 }}
            title={name}
            description={location}
          />
        </MapView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginTop: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  distance: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statusRed: {
    color: "red",
  },
  statusYellow: {
    color: "orange",
  },
  statusGreen: {
    color: "green",
  },
  chartContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 10,
    marginLeft: -22,
  },
  map: {
    height: 200,
    borderRadius: 10,
  },
});
