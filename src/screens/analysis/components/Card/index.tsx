import React from "react";
import { View } from "react-native";

import { ConditionSection } from "./components/ConditionSection";
import { FeelingSection } from "./components/FeelingSection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { TagSection } from "./components/TagSection";
import { useAppTheme } from "../../../../hooks/useAppTheme";
import { useGetPostsForAnalysis } from "./components/hooks/useGetPostsForAnalysis";
import { Text } from "../../../../components/text";

export const Card = () => {
  const theme = useAppTheme();
  const { data: posts, isLoading, isFetching } = useGetPostsForAnalysis();

  if (isFetching || isLoading) {
    return <View />;
  }

  return (
    <View
      style={{
        width: "100%",
      }}
    >
      <View
        style={{
          marginHorizontal: 16,
          backgroundColor: theme.colors.white,
          borderRadius: 16,
          alignItems: "center",
        }}
      >
        <Header />

        {!posts?.length
          ? (
            <View
              style={{
                height: 100,
                justifyContent: "center",
              }}
            >
              <Text>データがない！</Text>
            </View>
          )
          : (
            <>
              <ConditionSection />

              <View style={{ height: 60 }} />

              <FeelingSection />

              <View style={{ height: 60 }} />

              <TagSection />

              <View style={{ height: 24 }} />
            </>
          )}

        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: theme.colors.textLight,
          }}
        />

        <Footer />
      </View>
    </View>
  );
};
