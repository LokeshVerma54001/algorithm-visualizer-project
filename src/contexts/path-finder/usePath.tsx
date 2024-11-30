'use client'

import { createContext, useContext, useState } from "react"

interface PathContextType{
    selectedType:string;
    setSelectedType:(type:string) =>void;
}

const PathContext = createContext<PathContextType | undefined>(undefined);

export const PathProvider:React.FC<{children: React.ReactNode}> = ({children}) =>{

    const [selectedType, setSelectedType] = useState<string>('');
    
    return (<PathContext.Provider value = {{selectedType, setSelectedType}}>
        {children}
    </PathContext.Provider>
    );
};

export const usePath = () => {
    const context = useContext(PathContext);
    if (!context) {
      throw new Error("usePath must be used within a PathProvider");
    }
    return context;
  };
  