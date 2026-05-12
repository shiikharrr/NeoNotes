import React from "react";

import {
  View,
  Text,
  Switch,
  StyleSheet,
} from "react-native";

export default function ThemeToggle({
  isDark,
  toggleTheme,
  colors,
}) {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          shadowColor: colors.shadow,
        },
      ]}
    >
      <View>
        <Text
          style={[
            styles.label,
            {
              color: colors.text,
            },
          ]}
        >
          {isDark
            ? "Dark Mode"
            : "Light Mode"}
        </Text>

        <Text
          style={[
            styles.subtext,
            {
              color: colors.subtext,
            },
          ]}
        >
          Futuristic adaptive UI
        </Text>
      </View>

      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        thumbColor={
          isDark
            ? colors.primary
            : "#ffffff"
        }
        trackColor={{
          false: "#94a3b8",
          true: colors.secondary,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 22,

    paddingHorizontal: 18,

    paddingVertical: 16,

    borderRadius: 24,

    borderWidth: 1,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowOpacity: 0.25,

    shadowRadius: 18,

    elevation: 10,
  },

  label: {
    fontSize: 16,

    fontWeight: "700",
  },

  subtext: {
    marginTop: 4,

    fontSize: 13,
  },
});