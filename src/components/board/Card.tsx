'use client';

import Color from 'color';
import { useCardDetail } from '@/context/CardDetailContext';
import {formatTimeAgo} from "@/lib/util";
import React, { useState, useMemo } from 'react';

interface CardProps {
  boardId: string;
  laneId: string;
  cardId: string;
  title: string;
  priority: string;
  color: string;
  modified: any;
  createdBy: {
    uid: string;
    displayName: string;
    photoURL: string;
  };
}

const getInitials = (name: string): string => {
  if (!name) return '??';
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
  ).toUpperCase();
};

const Card = ({ boardId, laneId, cardId, title, color, modified, createdBy, priority }: CardProps) => {
  const { openCardDetail } = useCardDetail();
  const [hasImageError, setHasImageError] = useState(false);
  const {displayName, photoURL} = createdBy;
  const initials = useMemo(() => getInitials(displayName), [displayName]);
  const sizedPhotoURL = photoURL ? photoURL.split('=')[0] + '=s32-c' : '';

  const cardBgColor = Color(color).lighten(0.4).hex();
  const cardBorderColor = Color(color).darken(0.2).hex();
  const darkColor = Color(color).darken(0.3).hex();

  const handleCardClick = () => {
    openCardDetail({ boardId, laneId, cardId, priority });
  };

  const handleImageError = () => {
    // When error occurs, set flag to true to render initials
    setHasImageError(true);
  };

  function getColorForPriority(priority: string) {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-500'; // A bold red for high priority
      case 'medium':
        return 'bg-yellow-700'; // A warm yellow for medium priority
      case 'low':
        return 'bg-green-500'; // A calm green for low priority
      case 'critical':
        return 'bg-red-700'; // A distinct color for critical tasks
      default:
        return 'bg-gray-400'; // A neutral gray for unknown or default
    }
  }

  return (
      <div className='mb-3 bg-gray-100 rounded-sm shadow-md cursor-pointer hover:shadow-lg  '
           style={{
             background: cardBgColor,
             border: `1px solid ${cardBorderColor}`
           }}>
        <div
          className=" p-3"
          onClick={handleCardClick}
        >
          <small className={`text-white text-xs p-1 font-black rounded-sm ${getColorForPriority(priority)}`}>{priority.toUpperCase()}</small>
          <p className="text-gray-800 mt-2 text-lg">{title}</p>

        </div>
        <div className='flex items-center justify-between px-3 py-2 ' style={{
          background: darkColor
        }}>
          {hasImageError || !photoURL ? (
              <div
                  className="w-8 h-8 rounded-full bg-indigo-200 border border-gray-300 flex items-center justify-center font-semibold text-xs text-indigo-800"
                  title={displayName}
              >
                {initials}
              </div>
          ) : (
              <img
                  src={sizedPhotoURL}
                  alt={displayName}
                  title={displayName}
                  className="h-6 w-6 rounded-full"
                  onError={handleImageError}
              />
          )}
          <div className='text-white'>{modified && formatTimeAgo(modified.toMillis())}</div>
        </div>
      </div>
  );
};

export default Card;