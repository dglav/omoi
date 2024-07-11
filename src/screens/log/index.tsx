import { useState } from "react";

import { Container } from "../../components/FeedAndAnalysisHeader/Container";
import { Header } from "../../components/FeedAndAnalysisHeader/Header";
import MyLogScreen from "./MyLog";
import PartnerLogScreen from "./PartnerLog";

export default function LogScreen() {
  const [activeTab, setActiveTab] = useState<"me" | "partner">("me");

  return (
    <Container activeTab={activeTab}>
      <Header title="Omoi" activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "me" && <MyLogScreen />}
      {activeTab === "partner" && <PartnerLogScreen />}
    </Container>
  );
}
