import React, { createContext, useContext, useState } from 'react';

// Define the context type
interface ContainerSize {
  width: number;
  height: number;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
}

// Create the context with a default value
export const ContainerSizeContext = createContext<ContainerSize | null>(null);

// Custom hook to consume the context
export const useContainerSize = (): ContainerSize => {
  const value = useContext(ContainerSizeContext);
  if (!value) {
    throw new Error(
      'useContainerSize must be called with an `ContainerSizeContext`',
    );
  }
  return value;
};

type ContainerSizeProviderProps = {
  children?: React.ReactNode;
};

export const ContainerSizeProvider: React.FC<ContainerSizeProviderProps> = ({
  children,
}) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  return (
    <ContainerSizeContext.Provider
      value={{
        width,
        height,
        setWidth,
        setHeight,
      }}
    >
      {children}
    </ContainerSizeContext.Provider>
  );
};
