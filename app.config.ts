import "dotenv/config";

export default {
  expo: {
    owner: "dglav",
    name: "omoi",
    slug: "omoi",
    version: "0.2.1",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#21B979",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.dglav.omoi",
      buildNumber: "0.2.1",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#21B979",
      },
      package: "com.dglav.omoi",
    },
    web: {
      favicon: "./assets/images/favicon.png",
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
