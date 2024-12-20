import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

export default function DetailView() {
  const navigation = useNavigation(); // 최상위에서 선언

  // 세부 정보 데이터
  const congestionData = [
    {
      id: "1",
      name: "여의도역 1번출구",
      location: "Waterfront Park",
      status: "red",
    },
    { id: "2", name: "배달존 2", location: "City Center", status: "yellow" },
    { id: "3", name: "선착장", location: "Hilltop Gardens", status: "green" },
  ];

  const popularityData = [
    { id: "1", name: "홍대입구", location: "Hongdae Area", status: "red" },
    { id: "2", name: "강남역", location: "Gangnam Station", status: "yellow" },
    {
      id: "3",
      name: "북촌 한옥마을",
      location: "Bukchon Village",
      status: "green",
    },
  ];

  const [detailTab, setDetailTab] = useState("congestion"); // "congestion" or "popularity"

  const renderDetailItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate("DetailInfo", {
          name: item.name,
          location: item.location,
          status: item.status,
          distance: "1km", // 거리 정보를 전달 (예제용)
        })
      }
    >
      <View style={styles.rankContainer}>
        <Text style={styles.rank}>{item.id}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.location}>Location: {item.location}</Text>
      </View>
      <View style={styles.statusContainer}>
        <View
          style={[
            styles.statusIndicator,
            {
              backgroundColor:
                item.status === "red"
                  ? "red"
                  : item.status === "yellow"
                  ? "yellow"
                  : "green",
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.detailsContainer}>
      {/* 하위 탭: 혼잡도순, 인기순 */}
      <View style={styles.subTabContainer}>
        <TouchableOpacity
          style={[
            styles.subTabButton,
            detailTab === "congestion" && styles.activeSubTabButton,
          ]}
          onPress={() => setDetailTab("congestion")}
        >
          <Text
            style={[
              styles.subTabButtonText,
              detailTab === "congestion" && styles.activeSubTabButtonText,
            ]}
          >
            혼잡도순
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.subTabButton,
            detailTab === "popularity" && styles.activeSubTabButton,
          ]}
          onPress={() => setDetailTab("popularity")}
        >
          <Text
            style={[
              styles.subTabButtonText,
              detailTab === "popularity" && styles.activeSubTabButtonText,
            ]}
          >
            인기순
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={detailTab === "congestion" ? congestionData : popularityData}
        renderItem={renderDetailItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
  detailsContainer: {
    flex: 1,
    // paddingHorizontal: 20,
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
