import { create } from "zustand";

type State = {
  relationshipLength: string | null;
  relationshipStatus: string | null;
  conversationAmount: string | null;
  conversationObstacle: string | null;
  selfExpression: string | null;
  partnerExpression: string | null;
};

type Actions = {
  setRelationshipLength: (value: string) => void;
  setRelationshipStatus: (value: string) => void;
  setConversationAmount: (value: string) => void;
  setConversationObstacle: (value: string) => void;
  setSelfExpression: (value: string) => void;
  setPartnerExpression: (value: string) => void;
};

export const useStore = create<State & Actions>((set) => ({
  relationshipLength: null,
  setRelationshipLength: (value) => set({ relationshipLength: value }),

  relationshipStatus: null,
  setRelationshipStatus: (value) => set({ relationshipStatus: value }),

  conversationAmount: null,
  setConversationAmount: (value) => set({ conversationAmount: value }),

  conversationObstacle: null,
  setConversationObstacle: (value) => set({ conversationObstacle: value }),

  selfExpression: null,
  setSelfExpression: (value) => set({ selfExpression: value }),

  partnerExpression: null,
  setPartnerExpression: (value) => set({ partnerExpression: value }),
}));
