import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";

import Header from "./src/components/Header";
import { TimerType } from "./src/types/TypeTimer";
import timerValues from "./src/constants/timerValues";
import colors from "./src/constants/colors";
import Timer from "./src/components/Timer";

const App = (): JSX.Element => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(timerValues["Pomodoro"]);
  const [currentTimer, setCurrentTimer] = useState<TimerType>("Pomodoro");

  let interval: NodeJS.Timeout | undefined = undefined;

  useEffect(() => {
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            playAlarm();
            setIsRunning(false);
            return timerValues[currentTimer];
          }

          return prevTime - 1;
        });
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, currentTimer]);

  useEffect(() => {
    if (isRunning) setIsRunning(false);
  }, [currentTimer]);

  const handleRun = (): void => {
    playSound();
    setIsRunning(!isRunning);
  };

  const playSound = async (): Promise<void> => {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/press.mp3")
    );

    await sound.playAsync();
  };

  const playAlarm = async (): Promise<void> => {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/clock-alarm.mp3")
    );

    await sound.playAsync();
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTimer] }]}
    >
      <View
        style={[
          styles.commonView,
          Platform.OS === "android" ? styles.androidView : styles.defaultView,
        ]}
      >
        <Text style={styles.text}>Pomodoro Timer</Text>
        <Header
          currentTimer={currentTimer}
          setCurrentTimer={setCurrentTimer}
          setTime={setTime}
        />
        <Timer time={time} />
        <TouchableOpacity style={styles.button} onPress={handleRun}>
          <Text style={styles.buttonText}>{isRunning ? "Pause" : "Start"}</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commonView: {
    flex: 1,
    paddingHorizontal: 15,
  },
  androidView: {
    flex: 1,
    paddingTop: 30,
  },
  defaultView: {},
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#333",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default App;
