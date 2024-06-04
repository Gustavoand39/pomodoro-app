import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, View, Text, Platform, StyleSheet } from "react-native";

import Header from "./src/components/Header";
import { TimerType } from "./src/types/TypeTimer";
import timerValues from "./src/constants/timerValues";
import colors from "./src/constants/colors";

const App = (): JSX.Element => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(timerValues["Pomodoro"]);
  const [currentTimer, setCurrentTimer] = useState<TimerType>("Pomodoro");

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTimer] }]}
    >
      <View
        style={[
          Platform.OS === "android" ? styles.androidView : styles.defaultView,
        ]}
      >
        <Text style={styles.text}>Pomodoro Timer</Text>
        <Text style={styles.text}>{time}</Text>
        <Header
          currentTimer={currentTimer}
          setCurrentTimer={setCurrentTimer}
          setTime={setTime}
        />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  androidView: {
    flex: 1,
    paddingTop: 30,
  },
  defaultView: {
    // Opcional: estilos para otras plataformas
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default App;
