import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { routeData } from "../../components/data/RouteData";

export default function RouteScreen({ navigation }) {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["50%", "25%"], []);
  const handleSheetChanges = useCallback((index) => {
    console.log("BottomSheet Index: ", index);
  }, []);

  const [showRoute, setShowRoute] = useState(false);

  const routeCoordinates = routeData;

  const handleFindRoute = () => {
    setShowRoute(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.maintitle}>Festimap</Text>
      <View style={styles.topBar}>
        <TextInput style={styles.input} placeholder="목적지를 입력하세요" />
        <TouchableOpacity
          style={styles.findRouteButton}
          onPress={handleFindRoute}
        >
          <Text style={styles.findRouteButtonText}>길찾기</Text>
        </TouchableOpacity>
      </View>

      {/* 지도 */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.524087,
          longitude: 126.925426,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: 37.524087, longitude: 126.925426 }}
          title="여의도"
          description="여의도 불꽃놀이 축제 위치"
        />

        {/* 경로 폴리라인에 테두리 효과 적용 */}
        {showRoute && (
          <>
            {/* 아래쪽 하얀색 테두리 (두꺼운 선) */}
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="#fff"
              strokeWidth={12}
            />
            {/* 실제 경로 색상 (위에 올라가는 얇은 선) */}
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="#007bff"
              strokeWidth={5}
            />
          </>
        )}
      </MapView>

      {showRoute && (
        <View style={styles.bottomBar}>
          <View style={styles.routeInfoBox}>
            <Text style={styles.populationText}>목적지 까지</Text>
            <Text style={styles.statusTextSmooth}>원활</Text>
            <Text style={styles.durationText}>13분</Text>
            <Text style={styles.distanceText}>1112.40m</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomBar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    zIndex: 2,
  },
  routeInfoBox: {
    width: 180,
    justifyContent: "center",
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 5,
    borderColor: "#88888880",
    borderWidth: 1,
    backgroundColor: "#fff",
    // 내부 박스 그림자
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  populationText: {
    fontSize: 18,
    color: "#555",
    marginBottom: 5,
    fontWeight: "600",
    paddingLeft: 5,
  },
  statusTextSmooth: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#00a000",
    marginBottom: 5,
    paddingLeft: 10,
  },
  durationText: {
    paddingLeft: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  distanceText: {
    paddingLeft: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  topBar: {
    position: "absolute",
    top: 110,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 15,
    // 그림자 강화
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 2,
  },
  maintitle: {
    fontSize: 40,
    fontWeight: "bold",
    backgroundColor: "white",
    zIndex: 10,
    height: 100,
    paddingVertical: 40,
    paddingLeft: 20,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  findRouteButton: {
    marginLeft: 10,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    // 버튼 그림자
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
  },
  findRouteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
});
