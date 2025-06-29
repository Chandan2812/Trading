import { createContext, useContext, useState, ReactNode } from "react";

interface PopupContextType {
  showPopup: boolean;
  openPopup: () => void;
  closePopup: () => void;
}

const PopupContext = createContext<PopupContextType>({
  showPopup: false,
  openPopup: () => {},
  closePopup: () => {},
});

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  return (
    <PopupContext.Provider value={{ showPopup, openPopup, closePopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);
