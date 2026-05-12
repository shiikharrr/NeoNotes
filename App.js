import React, { useState } from "react";

import {
  View,
  Pressable,
  Text,
  StyleSheet,
  useColorScheme,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import NotesScreen from "./screens/NotesScreen";

import EditorScreen from "./screens/EditorScreen";

import {
  lightColors,
  darkColors,
} from "./constants/colors";

export default function App() {
  const systemTheme =
    useColorScheme();

  const isDark =
    systemTheme === "dark";

  const colors = isDark
    ? darkColors
    : lightColors;

  const [activeScreen, setActiveScreen] =
    useState("notes");

  const [selectedNote, setSelectedNote] =
    useState(null);

  const [notes, setNotes] =
    useState([
      {
        id: "1",

        title:
          "AI Startup Blueprint",

        preview:
          "Build scalable AI productivity systems with collaborative workflows and futuristic UX.",

        date: "Today",
      },

      {
        id: "2",

        title:
          "Military Fitness",

        preview:
          "Morning cardio, mobility drills, progressive strength training and endurance tracking.",

        date: "Yesterday",
      },

      {
        id: "3",

        title:
          "Travel Vision",

        preview:
          "Research snowy mountain destinations, camping spots and cinematic travel locations.",

        date: "May 10",
      },
    ]);

  const openNote = (note) => {
    setSelectedNote(note);

    setActiveScreen("editor");
  };

  const createNote = () => {
    const newNote = {
      id: Date.now().toString(),

      title: "",

      preview: "",

      date: "New",
    };

    setSelectedNote(newNote);

    setActiveScreen("editor");
  };

  const saveNote = (
    title,
    content
  ) => {
    const updatedNote = {
      ...selectedNote,

      title:
        title || "Untitled Note",

      preview: content,

      date: "Now",
    };

    const existingNote =
      notes.find(
        (note) =>
          note.id ===
          updatedNote.id
      );

    if (existingNote) {
      const updatedNotes =
        notes.map((note) =>
          note.id ===
          updatedNote.id
            ? updatedNote
            : note
        );

      setNotes(updatedNotes);
    } else {
      setNotes([
        updatedNote,
        ...notes,
      ]);
    }

    setActiveScreen("notes");
  };

  const deleteNote = (id) => {
    const updatedNotes =
      notes.filter(
        (note) => note.id !== id
      );

    setNotes(updatedNotes);
  };

  return (
    <View style={styles.container}>
      {activeScreen ===
      "notes" ? (
        <NotesScreen
          notes={notes}
          openNote={openNote}
          deleteNote={deleteNote}
          createNote={createNote}
        />
      ) : (
        <EditorScreen
          note={selectedNote}
          saveNote={saveNote}
        />
      )}

      {/* FLOATING NAV */}

      <View
        style={[
          styles.floatingNav,
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
        <Pressable
          onPress={() =>
            setActiveScreen(
              "notes"
            )
          }
          style={[
            styles.navButton,

            activeScreen ===
              "notes" && {
              backgroundColor:
                colors.glow,
            },
          ]}
        >
          <Ionicons
            name="document-text"
            size={22}
            color={
              colors.primary
            }
          />

          <Text
            style={[
              styles.navText,
              {
                color:
                  colors.text,
              },
            ]}
          >
            Notes
          </Text>
        </Pressable>

        <Pressable
          onPress={() =>
            setActiveScreen(
              "editor"
            )
          }
          style={[
            styles.navButton,

            activeScreen ===
              "editor" && {
              backgroundColor:
                colors.glow,
            },
          ]}
        >
          <Ionicons
            name="create"
            size={22}
            color={
              colors.primary
            }
          />

          <Text
            style={[
              styles.navText,
              {
                color:
                  colors.text,
              },
            ]}
          >
            Editor
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  floatingNav: {
    position: "absolute",

    bottom: 28,

    left: 24,

    right: 24,

    flexDirection: "row",

    justifyContent:
      "space-between",

    alignItems: "center",

    padding: 12,

    borderRadius: 28,

    borderWidth: 1,

    shadowOffset: {
      width: 0,
      height: 12,
    },

    shadowOpacity: 0.2,

    shadowRadius: 24,

    elevation: 12,
  },

  navButton: {
    flex: 1,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    paddingVertical: 14,

    borderRadius: 20,
  },

  navText: {
    marginLeft: 8,

    fontSize: 15,

    fontWeight: "700",
  },
});