import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // 아이콘 사용

import SlideModal from "../../components/Modal/SlideModal";
import MapView from "../../components/Views/MapView";
import DetailView from "../../components/Views/DetailView";
import MapVisualizationFromJSON from "../../components/Views/MapVisualizationFromJSON";

export default function MapScreen() {
  const [viewType, setViewType] = useState("map"); // "map" or "info" or "submap"
  const [modalVisible, setModalVisible] = useState(false);

  const [notiVisible, setnotiVisible] = useState(false);

  const toggleView = (type) => {
    setViewType(type);
  };

  const notifications = [
    { id: "1", message: "여의도 지역 혼잡도가 높습니다." },
    { id: "2", message: "19시 이후 대중교통 이용객이 증가하고 있습니다." },
    // { id: "3", message: "30대 방문자가 많은 지역: 여의나루공원" },
  ];

  const noti = [
    {
      id: "1",
      message: "지금 있는 지역이 혼잡합니다. 다른 지역으로 이동해주세요",
      date: "2024-11-11 13:32",
    },
    {
      id: "2",
      message: "곧있으면 불꽃놀이가 시작됩니다.",
      date: "2024-11-11 13:32",
    },
    {
      id: "3",
      message: "지금 있는 지역이 혼잡합니다. 다른 지역으로 우회바랍니다",
      date: "2024-11-11 13:32",
    },
    {
      id: "4",
      message: "지금 있는 지역이 혼잡합니다. 다른 지역으로 이동해주세요",
      date: "2024-11-11 13:32",
    },
  ];

  return (
    <View style={styles.container}>
      {/* 상단 타이틀과 알림 버튼 */}
      <View style={styles.header}>
        <Text style={styles.maintitle}>Festimap</Text>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="notifications-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => setnotiVisible(true)}
        >
          <Ionicons name="notifications-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      {/* 상단 탭 */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            viewType === "map" && styles.activeTabButton,
          ]}
          onPress={() => toggleView("map")}
        >
          <Text
            style={[
              styles.tabButtonText,
              viewType === "map" && styles.activeTabButtonText,
            ]}
          >
            전지역 지도
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            viewType === "submap" && styles.activeTabButton,
          ]}
          onPress={() => toggleView("submap")}
        >
          <Text
            style={[
              styles.tabButtonText,
              viewType === "submap" && styles.activeTabButtonText,
            ]}
          >
            경로 흐름
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            viewType === "info" && styles.activeTabButton,
          ]}
          onPress={() => toggleView("info")}
        >
          <Text
            style={[
              styles.tabButtonText,
              viewType === "info" && styles.activeTabButtonText,
            ]}
          >
            세부 정보
          </Text>
        </TouchableOpacity>
      </View>

      {/* 지도 화면 */}
      {viewType === "map" && <MapView />}

      {/* 세부 정보 화면 */}
      {viewType === "info" && <DetailView />}
      {viewType === "submap" && <MapVisualizationFromJSON />}

      {/* 알림 모달 */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>알림</Text>
            <FlatList
              data={notifications}
              renderItem={({ item }) => (
                <Text style={styles.notificationItem}>{item.message}</Text>
              )}
              keyExtractor={(item) => item.id}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <SlideModal
        visible={notiVisible}
        notifications={noti}
        onClose={() => setnotiVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  maintitle: {
    fontSize: 40,
    fontWeight: "bold",
  },
  notificationButton: {
    padding: 10,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: Dimensions.get("window").width * 0.8,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  notificationItem: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
