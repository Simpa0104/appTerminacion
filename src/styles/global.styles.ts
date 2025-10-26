import { StyleSheet } from "react-native";
import { theme } from "./theme";
import styled from "styled-components/native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },

  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },

  label: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.primary,
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.xs,
  },

  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.card,
  },

  buttonPrimary: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: theme.fontWeight.bold,
  },

  errorText: {
    color: theme.colors.text.error,
    fontSize: theme.fontSize.sm,
    marginTop: theme.spacing.xs,
  },
});

export const FormContainer = styled.ScrollView`
  flex: 1;
  background-color: white;
  padding: 16px;
  border-radius: 12px;
  margin: 16px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;
