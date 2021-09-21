import React, {createContext, useContext, useState} from 'react';
import {MediaType, MediaTypes} from '../types/MediaTypes.enum';

const MediaTypeSelectionContext = createContext<
  [MediaTypes, React.Dispatch<React.SetStateAction<MediaTypes>>]
>([MediaTypes.ALL, () => null]);

export function MediaTypeSelectionProvider(props) {
  const [mediaTypeSelection, setMediaTypeSelection] = useState<MediaType>(
    MediaTypes.ALL,
  );
  const value = [mediaTypeSelection, setMediaTypeSelection];

  return (
    <MediaTypeSelectionContext.Provider {...props} value={value}>
      {props.children}
    </MediaTypeSelectionContext.Provider>
  );
}

export function useMediaTypeSelection() {
  const context = useContext(MediaTypeSelectionContext);
  if (!context) {
    throw new Error(
      `mediaTypeSelection must be rendered within the ${MediaTypeSelectionProvider.name}`,
    );
  }
  return context;
}
