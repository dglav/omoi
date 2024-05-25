import "dotenv/config";

export default {
  expo: {
    owner: "dglav",
    name: "omoi",
    slug: "omoi",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.dglav.omoi",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.dglav.omoi",
    },
    web: {
      favicon: "./assets/favicon.png",
      bundler: "metro",
    },
    plugins: [
      [
        "expo-router",
        {
          root: "./src/app",
        },
      ],
      [
        "expo-build-properties",
        {
          ios: {
            newArchEnabled: false,
          },
          android: {
            newArchEnabled: false,
          },
        },
      ],
    ],
    scheme: "myapp",
    extra: {
      router: {
        origin: false,
        root: "./src/app",
      },
      eas: {
        projectId: "043ec743-5ab0-46eb-b6dc-b0c987e61bcd",
      },
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    },
  },
};
