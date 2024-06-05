import React from "react";
import { Text, View, StyleSheet } from "react-native";

interface TimerProps {
  time: number;
}

const Timer: React.FC<TimerProps> = ({ time }): JSX.Element => {
  const formattedTime = (time: number): string => {
    const formattedMinutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const formattedSeconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formattedTime(time)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    padding: 15,
    borderRadius: 15,
  },
  time: {
    fontSize: 80,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
});

export default Timer;
