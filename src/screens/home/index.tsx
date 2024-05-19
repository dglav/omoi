import { useState } from "react";

import { MyHome } from "./MyHome";
import { PartnerHome } from "./PartnerHome";
import { Container } from "../../components/Feed/Container";
import { Header } from "../../components/Feed/Header";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<"me" | "partner">("me");

  return (
    <Container activeTab={activeTab}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "me" && <MyHome />}
      {activeTab === "partner" && <PartnerHome />}
    </Container>
  );
}
