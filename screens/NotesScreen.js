import React, {
  useState,
  useEffect,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  useColorScheme,
  useWindowDimensions,
  StatusBar,
  Pressable,
  Animated,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import NoteCard from "../components/NoteCard";

import ThemeToggle from "../components/ThemeToggle";

import {
  lightColors,
  darkColors,
} from "../constants/colors";

export default function NotesScreen({
  notes,
  openNote,
  deleteNote,
  createNote,
}) {
  const systemTheme =
    useColorScheme();

  const [isDark, setIsDark] =
    useState(
      systemTheme === "dark"
    );

  const [search, setSearch] =
    useState("");

  const { width, height } =
    useWindowDimensions();

  const isTablet = width > 700;

  const colors = isDark
    ? darkColors
    : lightColors;

  const glowAnim =
    useState(
      new Animated.Value(0)
    )[0];

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(
          glowAnim,
          {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }
        ),

        Animated.timing(
          glowAnim,
          {
            toValue: 0,
            duration: 4000,
            useNativeDriver: true,
          }
        ),
      ])
    ).start();
  }, []);

  const glowTranslate =
    glowAnim.interpolate({
      inputRange: [0, 1],

      outputRange: [-20, 20],
    });

  const filteredNotes =
    notes.filter((note) =>
      note.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            colors.background,
        },
      ]}
    >
      <StatusBar
        barStyle={
          isDark
            ? "light-content"
            : "dark-content"
        }
      />

      {/* ANIMATED GLOW */}

      <Animated.View
        style={[
          styles.glowOrbOne,

          {
            backgroundColor:
              colors.primary,

            transform: [
              {
                translateY:
                  glowTranslate,
              },
            ],
          },
        ]}
      />

      <Animated.View
        style={[
          styles.glowOrbTwo,

          {
            backgroundColor:
              colors.secondary,

            transform: [
              {
                translateX:
                  glowTranslate,
              },
            ],
          },
        ]}
      />

      {/* HEADER */}

      <View style={styles.header}>
        <View>
          <Text
            style={[
              styles.heading,
              {
                color:
                  colors.text,

                fontSize:
                  isTablet
                    ? 54
                    : 40,
              },
            ]}
          >
            NeoNotes
          </Text>

          <Text
            style={[
              styles.subheading,
              {
                color:
                  colors.subtext,
              },
            ]}
          >
            Elite futuristic note
            workspace
          </Text>
        </View>

        <View
          style={[
            styles.logoBox,
            {
              backgroundColor:
                colors.card,

              borderColor:
                colors.border,

              shadowColor:
                colors.primary,
            },
          ]}
        >
          <Ionicons
            name="sparkles"
            size={
              isTablet
                ? 44
                : 34
            }
            color={colors.primary}
          />
        </View>
      </View>

      {/* TOGGLE */}

      <ThemeToggle
        isDark={isDark}
        toggleTheme={() =>
          setIsDark(!isDark)
        }
        colors={colors}
      />

      {/* SEARCH */}

      <View
        style={[
          styles.searchWrapper,
          {
            backgroundColor:
              colors.card,

            borderColor:
              colors.border,

            shadowColor:
              colors.shadow,
          },
        ]}
      >
        <Ionicons
          name="search"
          size={22}
          color={colors.subtext}
        />

        <TextInput
          placeholder="Search notes..."
          placeholderTextColor={
            colors.subtext
          }
          value={search}
          onChangeText={setSearch}
          style={[
            styles.input,
            {
              color:
                colors.text,
            },
          ]}
        />
      </View>

      {/* NOTES */}

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) =>
          item.id
        }
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={{
          paddingBottom: 180,
        }}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            colors={colors}
            isTablet={isTablet}
            onPress={() =>
              openNote(item)
            }
            onDelete={() =>
              deleteNote(item.id)
            }
          />
        )}
      />

      {/* CREATE BUTTON */}

      <Pressable
        onPress={createNote}
        style={[
          styles.createButton,
          {
            backgroundColor:
              colors.primary,

            shadowColor:
              colors.primary,
          },
        ]}
      >
        <Ionicons
          name="add"
          size={36}
          color="#ffffff"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 70,

    paddingHorizontal: 22,
  },

  glowOrbOne: {
    position: "absolute",

    width: 260,

    height: 260,

    borderRadius: 999,

    top: -80,

    left: -80,

    opacity: 0.18,
  },

  glowOrbTwo: {
    position: "absolute",

    width: 220,

    height: 220,

    borderRadius: 999,

    bottom: 80,

    right: -60,

    opacity: 0.15,
  },

  header: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",

    marginBottom: 26,
  },

  heading: {
    fontWeight: "900",

    letterSpacing: -2,
  },

  subheading: {
    marginTop: 10,

    fontSize: 16,

    fontWeight: "500",
  },

  logoBox: {
    width: 84,

    height: 84,

    borderRadius: 32,

    borderWidth: 1,

    alignItems: "center",

    justifyContent: "center",

    shadowOffset: {
      width: 0,
      height: 10,
    },

    shadowOpacity: 0.35,

    shadowRadius: 22,

    elevation: 14,
  },

  searchWrapper: {
    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 20,

    marginBottom: 28,

    borderRadius: 28,

    borderWidth: 1,

    shadowOffset: {
      width: 0,
      height: 10,
    },

    shadowOpacity: 0.18,

    shadowRadius: 18,

    elevation: 10,
  },

  input: {
    flex: 1,

    paddingVertical: 20,

    paddingLeft: 14,

    fontSize: 16,

    fontWeight: "500",
  },

  createButton: {
    position: "absolute",

    bottom: 120,

    right: 24,

    width: 76,

    height: 76,

    borderRadius: 999,

    alignItems: "center",

    justifyContent: "center",

    shadowOffset: {
      width: 0,
      height: 12,
    },

    shadowOpacity: 0.35,

    shadowRadius: 24,

    elevation: 18,
  },
});