'use client';

import { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import {auth, db} from '@/lib/firebase';
import Card from './Card';
import CardEditor from './CardEditor';
import CardSkeleton from './CardSkeleton';
import {Lane} from "@/types";
import {useAuthState} from "react-firebase-hooks/auth";
import Color from "color";

interface LaneProps {
  boardId: string;
  lane: Lane;
}

const LaneView = ({ boardId, lane }: LaneProps) => {
  const [user, authLoading, authError] = useAuthState(auth);
  const [isAddingCard, setIsAddingCard] = useState(false);

  if (!lane) {
    return <div>Error</div>; // or some fallback UI
  }

  // Fetch the cards for this lane, ordered by the 'order' field
  const cardsRef = collection(db, 'boards', boardId, 'lanes', lane.id ?? "", 'cards');
  const q = query(cardsRef, orderBy('order', 'asc'));
  const [cards, loading, error] = useCollection(q);

  const handleSaveCard = async (title: string) => {
    try {
      setIsAddingCard(false);
      // For calculating the order, get the number of existing cards.
      const newOrder = cards ? cards.docs.length : 0;
      
      await addDoc(cardsRef, {
        title,
        order: newOrder,
        priority: "Medium",
        createdBy: {
            uid: user?.uid || 'unknown',
            displayName: user?.displayName || 'Anonymous',
            photoURL: user?.photoURL || '',
        },
        createdAt: serverTimestamp(),
      });
      
      // Hide the editor after saving
      setIsAddingCard(false);
    } catch (err) {
      console.error("Error adding card: ", err);
      // Optionally, show an error to the user
    }
  };

  const darkColor = Color(lane.color).darken(0.3).hex();

  return (
    <div className={`bg-white rounded-lg shadow p-4 w-80 flex-shrink-0 flex flex-col h-[85vh]`}
         style={{
           borderTopWidth: '20px', borderBottomWidth: '4px',
           borderTopStyle: 'solid',
           borderTopColor: darkColor, borderBottomColor: lane.color
         }}>
      <h2 className="font-bold text-lg mb-4 text-gray-800 px-2">{lane.title}</h2>
      
      {/* Container for cards with vertical scrolling */}
      <div className="overflow-y-auto space-y-3 pr-1">
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {loading && (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        )}
        
        {cards && cards.docs.map(cardDoc => (
          <Card 
            key={cardDoc.id} 
            boardId={boardId}
            laneId={lane.id || ""}
            cardId={cardDoc.id}
            title={cardDoc.data().title}
            color={lane.color}
            priority={cardDoc.data().priority || undefined}
            createdBy={cardDoc.data().createdBy}
            modified={cardDoc.data().lastUpdated || cardDoc.data().createdAt}
          />
        ))}

        {/* Show the editor if we are in "add card" mode */}
        {isAddingCard && (
          <CardEditor 
            onSave={handleSaveCard} 
            onCancel={() => setIsAddingCard(false)} 
          />
        )}
      </div>

      {/* The "Add Card" button is shown only if the editor is not visible */}
      {!isAddingCard && (
        <button 
          onClick={() => setIsAddingCard(true)}
          className="mt-1 p-2 text-left text-gray-500 hover:bg-gray-200 rounded-md w-full transition-colors border-1 border-gray-300 border-dashed cursor-pointer"
        >
          + Add a card
        </button>
      )}
    </div>
  );
};

export default LaneView;
