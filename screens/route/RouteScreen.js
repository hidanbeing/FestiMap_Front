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

  const [selectedRoute, setSelectedRoute] = useState(0);
  const [showRoute, setShowRoute] = useState(false);

  const routeCoordinates = routeData;

  const routeDetails = useMemo(
    () => [
      { duration: "10분", population: "유동인구 수 6/m²", status: "혼잡" },
    ],
    []
  );

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
        {showRoute && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor={selectedRoute === 0 ? "#007bff" : "#ccc"}
            strokeWidth={4}
          />
        )}
      </MapView>

      {showRoute && (
        <View style={styles.bottomBar}>
          {routeDetails.map((details, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.routeInfoBox,
                selectedRoute === index && styles.selectedRouteBox,
              ]}
              onPress={() => setSelectedRoute(index)}
            >
              <Text style={styles.populationText}>{details.population}</Text>
              <Text
                style={
                  details.status === "혼잡"
                    ? styles.statusTextCongested
                    : styles.statusTextSmooth
                }
              >
                {details.status}
              </Text>
              <Text style={styles.durationText}>{details.duration}</Text>
            </TouchableOpacity>
          ))}
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
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 2,
  },
  routeInfoBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    marginHorizontal: 5,
  },
  selectedRouteBox: {
    backgroundColor: "#007bff",
  },
  populationText: {
    fontSize: 12,
    color: "#999",
    marginBottom: 5,
  },
  statusTextCongested: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff0000",
  },
  statusTextSmooth: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00a000",
  },
  durationText: {
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
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
  },
  findRouteButton: {
    marginLeft: 10,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
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
