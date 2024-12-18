import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* 타이틀 */}
      <Text style={styles.subtitle}>실시간으로 보는 축제의 흐름,</Text>
      <Text style={styles.title}>Festimap</Text>

      {/* 이메일 입력 */}
      <TextInput
        style={styles.input}
        placeholder="email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* 비밀번호 입력 */}
      <TextInput
        style={styles.input}
        placeholder="password"
        secureTextEntry
        autoCapitalize="none"
      />

      {/* 로그인 버튼 */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate("Main")}
      >
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      {/* 카카오 로그인 버튼 */}
      <TouchableOpacity
        style={styles.kakaoButton}
        onPress={() => navigation.navigate("Main")}
      >
        <Text style={styles.kakaoButtonText}>카카오 로그인</Text>
      </TouchableOpacity>

      {/* 하단 텍스트 */}
      <TouchableOpacity>
        <Text style={styles.footerText}>아이디 / 비밀번호를 잊어버렸나요?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  subtitle: {
    fontSize: 20,
    color: "#333",
  },
  title: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 30,
  },
  input: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  loginButton: {
    width: "90%",
    height: 50,
    backgroundColor: "#333",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  kakaoButton: {
    width: "90%",
    height: 50,
    backgroundColor: "#FEE500",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  kakaoButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    color: "#666",
    fontSize: 14,
    marginTop: 20,
    textDecorationLine: "underline",
  },
});
