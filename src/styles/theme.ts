// src/styles/theme.ts
export const theme = {
    colors: {
        primary: "#007AFF",
        secondary: "#005BBB",
        background: "#F2F2F2",
        card: "#FFFFFF",
        border: "#DDDDDD",
        text: {
            primary: "#333333",
            secondary: "#666666",
            error: "#FF3B30",
        },
    },

    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
    },

    borderRadius: {
        sm: 6,
        md: 8,
        lg: 12,
    },

    fontSize: {
        sm: 12,
        md: 14,
        lg: 18,
        xl: 20,
    },

    fontWeight: {
        regular: "400" as const, // 👈 string literal
        bold: "700" as const,
    },

    shadow: {
        card: {
            elevation: 4,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
        },
    },
};
