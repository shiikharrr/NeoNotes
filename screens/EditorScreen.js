import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ImageBackground,
  ScrollView,
  useColorScheme,
  useWindowDimensions,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  lightColors,
  darkColors,
} from "../constants/colors";

export default function EditorScreen({
  note,
  saveNote,
}) {
  const systemTheme =
    useColorScheme();

  const isDark =
    systemTheme === "dark";

  const colors = isDark
    ? darkColors
    : lightColors;

  const { width } =
    useWindowDimensions();

  const isTablet = width > 700;

  const [title, setTitle] =
    useState(note?.title || "");

  const [content, setContent] =
    useState(
      note?.preview || ""
    );

  return (
    <KeyboardAvoidingView
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
      style={[
        styles.container,
        {
          backgroundColor:
            colors.editorBackground,
        },
      ]}
    >
      {/* HEADER */}

      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
        }}
        style={styles.header}
        imageStyle={
          styles.headerImage
        }
      >
        <View
          style={styles.overlay}
        >
          <Text
            style={[
              styles.headerTitle,
              {
                fontSize:
                  isTablet
                    ? 42
                    : 30,
              },
            ]}
          >
            Edit Note
          </Text>

          <Text
            style={
              styles.headerSubtitle
            }
          >
            Futuristic writing
            workspace
          </Text>
        </View>
      </ImageBackground>

      {/* CONTENT */}

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 140,
        }}
        showsVerticalScrollIndicator={
          false
        }
      >
        {/* TITLE */}

        <View
          style={[
            styles.inputWrapper,
            {
              backgroundColor:
                colors.card,

              borderColor:
                colors.border,
            },
          ]}
        >
          <Text
            style={[
              styles.label,
              {
                color:
                  colors.subtext,
              },
            ]}
          >
            NOTE TITLE
          </Text>

          <TextInput
            placeholder="Enter title..."
            placeholderTextColor={
              colors.subtext
            }
            value={title}
            onChangeText={
              setTitle
            }
            style={[
              styles.titleInput,
              {
                color:
                  colors.text,
              },
            ]}
          />
        </View>

        {/* CONTENT */}

        <View
          style={[
            styles.editorWrapper,
            {
              backgroundColor:
                colors.card,

              borderColor:
                colors.border,
            },
          ]}
        >
          <Text
            style={[
              styles.label,
              {
                color:
                  colors.subtext,
              },
            ]}
          >
            NOTE CONTENT
          </Text>

          <TextInput
            multiline
            placeholder="Write your thoughts..."
            placeholderTextColor={
              colors.subtext
            }
            value={content}
            onChangeText={
              setContent
            }
            textAlignVertical="top"
            style={[
              styles.editorInput,
              {
                color:
                  colors.text,

                fontSize:
                  isTablet
                    ? 20
                    : 17,
              },
            ]}
          />
        </View>

        {/* BUTTONS */}

        <View
          style={styles.buttonRow}
        >
          <Pressable
            onPress={() =>
              saveNote(
                title,
                content
              )
            }
            style={[
              styles.saveButton,
              {
                backgroundColor:
                  colors.primary,
              },
            ]}
          >
            <Ionicons
              name="save"
              size={20}
              color="#ffffff"
            />

            <Text
              style={
                styles.buttonText
              }
            >
              Save Note
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.backButton,
              {
                borderColor:
                  colors.border,

                backgroundColor:
                  colors.card,
              },
            ]}
          >
            <Ionicons
              name="chevron-back"
              size={20}
              color={
                colors.text
              }
            />

            <Text
              style={[
                styles.backText,
                {
                  color:
                    colors.text,
                },
              ]}
            >
              Back
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    height: 260,

    justifyContent: "flex-end",
  },

  headerImage: {
    borderBottomLeftRadius: 40,

    borderBottomRightRadius: 40,
  },

  overlay: {
    flex: 1,

    backgroundColor:
      "rgba(0,0,0,0.45)",

    paddingHorizontal: 24,

    paddingBottom: 28,

    justifyContent: "flex-end",
  },

  headerTitle: {
    color: "#ffffff",

    fontWeight: "900",

    marginBottom: 10,
  },

  headerSubtitle: {
    color:
      "rgba(255,255,255,0.82)",

    fontSize: 15,
  },

  inputWrapper: {
    marginTop: 28,

    marginHorizontal: 22,

    padding: 22,

    borderRadius: 28,

    borderWidth: 1,
  },

  editorWrapper: {
    marginTop: 22,

    marginHorizontal: 22,

    minHeight: 340,

    padding: 22,

    borderRadius: 30,

    borderWidth: 1,
  },

  label: {
    fontSize: 12,

    fontWeight: "700",

    letterSpacing: 1.2,

    marginBottom: 16,
  },

  titleInput: {
    fontSize: 24,

    fontWeight: "800",
  },

  editorInput: {
    flex: 1,

    lineHeight: 30,

    minHeight: 240,
  },

  buttonRow: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    marginTop: 28,

    marginHorizontal: 22,
  },

  saveButton: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    paddingVertical: 18,

    paddingHorizontal: 28,

    borderRadius: 22,

    flex: 1,

    marginRight: 12,
  },

  backButton: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    paddingVertical: 18,

    paddingHorizontal: 24,

    borderRadius: 22,

    borderWidth: 1,
  },

  buttonText: {
    color: "#ffffff",

    fontSize: 16,

    fontWeight: "700",

    marginLeft: 10,
  },

  backText: {
    fontSize: 16,

    fontWeight: "700",

    marginLeft: 6,
  },
});