import React from "react";

import {
  Pressable,
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

export default function NoteCard({
  note,
  colors,
  isTablet,
  onPress,
  onDelete,
}) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{
        color: colors.glow,
      }}
      style={({ pressed }) => [
        styles.card,

        {
          backgroundColor:
            colors.card,

          borderColor:
            colors.border,

          shadowColor:
            colors.shadow,

          transform: [
            {
              scale: pressed
                ? 0.98
                : 1,
            },
          ],
        },
      ]}
    >
      {/* TOP ROW */}

      <View style={styles.topRow}>
        <View
          style={[
            styles.iconWrapper,
            {
              backgroundColor:
                colors.glow,
            },
          ]}
        >
          <Ionicons
            name="document-text"
            size={22}
            color={colors.primary}
          />
        </View>

        <View style={styles.actions}>
          <Text
            style={[
              styles.date,
              {
                color:
                  colors.primary,
              },
            ]}
          >
            {note.date}
          </Text>

          <Pressable
            onPress={onDelete}
          >
            <Ionicons
              name="trash"
              size={20}
              color="#ef4444"
            />
          </Pressable>
        </View>
      </View>

      {/* TITLE */}

      <Text
        numberOfLines={1}
        style={[
          styles.title,
          {
            color:
              colors.text,

            fontSize:
              isTablet
                ? 24
                : 20,
          },
        ]}
      >
        {note.title}
      </Text>

      {/* PREVIEW */}

      <Text
        numberOfLines={3}
        style={[
          styles.preview,
          {
            color:
              colors.subtext,

            fontSize:
              isTablet
                ? 16
                : 14,
          },
        ]}
      >
        {note.preview}
      </Text>

      {/* FOOTER */}

      <View style={styles.footer}>
        <Text
          style={[
            styles.readMore,
            {
              color:
                colors.secondary,
            },
          ]}
        >
          Open Note
        </Text>

        <Ionicons
          name="arrow-forward"
          size={18}
          color={colors.secondary}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,

    padding: 20,

    borderRadius: 28,

    borderWidth: 1,

    shadowOffset: {
      width: 0,
      height: 10,
    },

    shadowOpacity: 0.25,

    shadowRadius: 22,

    elevation: 10,
  },

  topRow: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginBottom: 18,
  },

  actions: {
    flexDirection: "row",

    alignItems: "center",

    gap: 14,
  },

  iconWrapper: {
    width: 48,

    height: 48,

    borderRadius: 18,

    justifyContent: "center",

    alignItems: "center",
  },

  date: {
    fontSize: 13,

    fontWeight: "700",
  },

  title: {
    fontWeight: "800",

    marginBottom: 12,
  },

  preview: {
    lineHeight: 24,

    marginBottom: 22,
  },

  footer: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  readMore: {
    fontSize: 14,

    fontWeight: "700",
  },
});