import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TimerType } from "../types/TypeTimer";
import timerValues from "../constants/timerValues";

interface HeaderProps {
  currentTimer: TimerType;
  setCurrentTimer: React.Dispatch<React.SetStateAction<TimerType>>;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

const OPTIONS: TimerType[] = ["Pomodoro", "Short Break", "Long Break"];

const Header: React.FC<HeaderProps> = ({
  currentTimer,
  setCurrentTimer,
  setTime,
}) => {
  const handlePress = (option: TimerType) => {
    const newTime = timerValues[option];
    setCurrentTimer(option);
    setTime(newTime);
  };

  return (
    <View style={styles.container}>
      {OPTIONS.map((option: TimerType, index: number) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            currentTimer !== option ? { borderColor: "transparent" } : null,
          ]}
          onPress={() => handlePress(option)}
        >
          <Text
            style={[
              styles.textOption,
              currentTimer === option ? { fontWeight: "bold" } : null,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  option: {
    width: "30%",
    borderWidth: 3,
    padding: 5,
    borderRadius: 10,
    borderColor: "white",
    marginVertical: 20,
  },
  textOption: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default Header;
