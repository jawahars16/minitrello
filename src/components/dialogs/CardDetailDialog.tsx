'use client';

import { useEffect, useState } from 'react';
import { useCardDetail } from '@/context/CardDetailContext';
import { doc, updateDoc, collection, query, runTransaction, addDoc, deleteDoc } from 'firebase/firestore';
import { useDocumentData, useCollection } from 'react-firebase-hooks/firestore';
import { db } from '@/lib/firebase';
import {CheckIcon, LoaderCircle, SaveIcon, X} from 'lucide-react';
import Color from "color";

const CardDetailDialog = () => {
  const { isCardDetailOpen, cardDetail, openCardDetail, closeCardDetail } = useCardDetail();

  // --- Data Fetching ---
  // 1. Fetch the specific card being viewed
  const cardPath = cardDetail ? `/boards/${cardDetail.boardId}/lanes/${cardDetail.laneId}/cards/${cardDetail.cardId}` : null;
  const cardRef = cardPath ? doc(db, cardPath) : null;
  const [card, loadingCard, errorCard] = useDocumentData(cardRef);

  // 2. Fetch all lanes for the current board to populate the move dropdown
  const lanesPath = cardDetail ? `/boards/${cardDetail.boardId}/lanes` : null;
  const lanesRef = lanesPath ? collection(db, lanesPath) : null;
  const [lanes, loadingLanes, errorLanes] = useCollection(lanesRef ? query(lanesRef) : null);

  // Local state for editable fields
  const [title, setTitle] = useState('');
  const [darkColor, setDarkColor] = useState('#ffffff');
  const [lightColor, setLightColor] = useState('#ffffff');
  const [laneId, setLaneId] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const priorities = ["Low", "Medium", "High", "Critical"];
  const [priority, setPriority] = useState("Medium");

  // --- State Synchronization ---
  // When the card data loads from Firestore, update the local editable state
  useEffect(() => {
    if (card) {
      setTitle(card.title || '');
      setLaneId(cardDetail?.laneId || "");
      setColor(cardDetail?.laneId || "");
      setPriority(cardDetail?.priority || "Medium");
      setIsDirty(false)
      setIsSaving(false)
    }
  }, [card]);

  if (!isCardDetailOpen || !cardDetail) {
    return null;
  }

  const onLaneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLaneId = e.target.value;
    setLaneId(newLaneId)
    setColor(newLaneId)
  }

  const setColor = (laneId:string) => {
    const laneDoc = lanes?.docs.find(doc => doc.id === laneId);
    if (!laneDoc) return; // Invalid lane selected

    const lane = laneDoc.data();

    const lightColor = Color(lane.color).lighten(0.4).hex();
    const darkColor = Color(lane.color).darken(0.2).hex();
    setDarkColor(darkColor);
    setLightColor(lightColor);
  }

  const handleSave = async () => {
    closeCardDetail();
    if (isSaving) return; // Prevent multiple saves
    setIsSaving(true);
    await Promise.all([saveDescription(), saveLaneChange(), savePriority()]);
    setIsSaving(false);
  }

  const savePriority = async () => {
    if (!cardRef || !card || card.priority === priority) return; // No changes to save

    try {
      await updateDoc(cardRef, {
        priority: priority,
      });
    } catch (error) {
      console.error("Error saving card details: ", error);
    }
  }

  const saveDescription = async () => {
    if (!cardRef || !card || card.title === title) return; // No changes to save

    try {
      await updateDoc(cardRef, {
        title: title,
      });
    } catch (error) {
      console.error("Error saving card details: ", error);
    }
  }

  const saveLaneChange = async () => {
    const { boardId, laneId: oldLaneId, cardId } = cardDetail;
    const newLaneId = laneId || oldLaneId;
    if (newLaneId === oldLaneId) return; // No lane change

    const oldCardRef = doc(db, 'boards', boardId, 'lanes', oldLaneId, 'cards', cardId);
    const newCardRef = doc(collection(db, 'boards', boardId, 'lanes', newLaneId, 'cards'));

    try {
      await runTransaction(db, async (transaction) => {
        const cardDoc = await transaction.get(oldCardRef);
        if (!cardDoc.exists()) {
          throw "Card does not exist!";
        }
        // Copy data to new location and delete the old one
        transaction.set(newCardRef, cardDoc.data());
        transaction.delete(oldCardRef);
      });
    } catch (error) {
      console.error("Error moving card: ", error);
    }
  }

  const isLoading = loadingCard || loadingLanes;

  const trimText = (text:string, maxLength:number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={closeCardDetail}>
      <div className="bg-gray-50 h-[40vh] rounded-lg shadow-2xl w-full max-w-4xl flex flex-col"
           style={{background:lightColor, borderTop: `8px solid ${darkColor}`}}
           onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center flex-shrink-0">
          {isLoading ? (
            <div className="h-8 w-1/2 bg-gray-200 rounded animate-pulse"></div>
          ) : (
            <p className="text-2xl font-bold text-gray-900">{trimText(title, 50)}</p>
          )}
          <button onClick={closeCardDetail} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <X size={24}  className='text-gray-900'/>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-4 overflow-y-auto bg-white">
          {isLoading ? (
            <p>Loading...</p>
          ) : (errorCard || errorLanes) ? (
            <p>Error: {errorCard?.message || errorLanes?.message}</p>
          ) : (
            <div className="grid grid-cols-3 gap-8">
              {/* Left Panel: Description */}
              <div className="col-span-2">
                <h3 className="text-lg font-semibold text-gray-700 mb-2 ml-2">Description</h3>
                <textarea
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value)
                    setIsDirty(true)
                  }}
                  placeholder="Add a more detailed description..."
                  className="w-full text-gray-900 h-full p-2 outline-none border-0 rounded focus:outline-none focus:ring-none focus:ring-gray-200 resize-none"
                />
              </div>

              {/* Right Panel: Details */}
              <div className="col-span-1">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Details</h3>
                <div className="space-y-4">
                  <div>
                    <select value={laneId}
                      onChange={(e) => {
                        onLaneChange(e);
                        setIsDirty(true);
                      }}
                      className="w-full p-2 border text-gray-900 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {lanes?.docs.map(laneDoc => (
                        <option key={laneDoc.id} value={laneDoc.id}>
                          {laneDoc.data().title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select value={priority}
                            onChange={(e) => {
                              setPriority(e.target.value);
                              setIsDirty(true);
                            }}
                            className="w-full p-2 border text-gray-900 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {priorities.map(p => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className='flex justify-end p-4 border-t border-t-gray-300 flex-shrink-0 bg-white'>
          <button className={`flex px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md
          disabled:bg-gray-400 disabled:text-gray-700 mr-4
          hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer`} onClick={closeCardDetail}>
            <X height='20'/>
            Cancel
          </button>
          {isDirty && <button disabled={isSaving} className={`flex px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md
          disabled:bg-gray-400 disabled:text-gray-700 
          hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer`}
          onClick={handleSave}>
            {isSaving ? <LoaderCircle height='20' className='animate-spin'/> : <SaveIcon height='20' />}
            <span className='ml-2 text-md'>Save</span>
          </button>}
        </div>
      </div>
    </div>
  );
};

export default CardDetailDialog;