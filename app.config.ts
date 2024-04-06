import "dotenv/config";

export default {
  expo: {
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
    ],
    scheme: "myapp",
    extra: {
      router: {
        origin: false,
        root: "./src/app",
      },
      eas: {
        projectId: "092fe555-09bf-4925-b540-1cdb42fe807a",
      },
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    },
  },
};