import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-web";

const SlideModal = ({ visible, notifications, onClose }) => {
  const screenWidth = Dimensions.get("window").width;
  const slideAnim = useRef(new Animated.Value(screenWidth)).current; // 시작 값을 화면 너비로 설정

  React.useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 80, // 화면 안으로 슬라이드
        duration: 300, // 애니메이션 지속 시간
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: screenWidth, // 화면 밖으로 슬라이드 (오른쪽으로)
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <Animated.View
        style={[
          styles.modalContainer,
          {
            transform: [{ translateX: slideAnim }], // translateX를 애니메이션으로 제어
          },
          { right: 0 }, // 오른쪽에서 시작
        ]}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>알림</Text>
          {notifications.map((item, index) => (
            <View key={index} style={styles.notificationItem}>
              <Text style={styles.notificationText}>{item.message}</Text>
              <Text style={styles.notificationTime}>{item.date}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  //   overlay: {
  //     // flex: 1,
  //     backgroundColor: "rgba(0,0,0,0.5)",
  //     justifyContent: "flex-start",
  //     alignItems: "flex-end", // 오른쪽에서 시작
  //   },
  modalContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: Dimensions.get("window").width * 0.8, // 화면 너비의 80%를 차지
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 5,
    elevation: 5,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalTitle: {
    marginTop: 35,
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },
  notificationItem: {
    marginBottom: 25,
  },
  notificationText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 5,
  },
  notificationTime: {
    fontSize: 14,
    color: "#999",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#999",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 320,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default SlideModal;
