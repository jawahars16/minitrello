'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CardDetail {
  boardId: string;
  laneId: string;
  cardId: string;
  priority: string;
}

interface CardDetailContextType {
  isCardDetailOpen: boolean;
  cardDetail: CardDetail | null;
  openCardDetail: (detail: CardDetail) => void;
  closeCardDetail: () => void;
}

const CardDetailContext = createContext<CardDetailContextType | undefined>(undefined);

export const CardDetailProvider = ({ children }: { children: ReactNode }) => {
  const [isCardDetailOpen, setIsCardDetailOpen] = useState(false);
  const [cardDetail, setCardDetail] = useState<CardDetail | null>(null);

  const openCardDetail = (detail: CardDetail) => {
    setCardDetail(detail);
    setIsCardDetailOpen(true);
  };

  const closeCardDetail = () => {
    setIsCardDetailOpen(false);
    setCardDetail(null);
  };

  return (
    <CardDetailContext.Provider value={{ isCardDetailOpen, cardDetail, openCardDetail, closeCardDetail }}>
      {children}
    </CardDetailContext.Provider>
  );
};

export const useCardDetail = () => {
  const context = useContext(CardDetailContext);
  if (context === undefined) {
    throw new Error('useCardDetail must be used within a CardDetailProvider');
  }
  return context;
};
