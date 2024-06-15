import { useState } from "react";

import { MyHome } from "./MyHome";
import { PartnerHome } from "./PartnerHome";
import { Container } from "../../components/FeedAndAnalysisHeader/Container";
import { Header } from "../../components/FeedAndAnalysisHeader/Header";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<"me" | "partner">("me");

  return (
    <Container activeTab={activeTab}>
      <Header title="Omoi" activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "me" && <MyHome />}
      {activeTab === "partner" && <PartnerHome />}
    </Container>
  );
}
