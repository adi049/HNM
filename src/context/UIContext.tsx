import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

interface UIState {
  bookingOpen: boolean;
  openBooking: () => void;
  /** Opens the enquiry with a room category pre-selected. */
  openBookingFor: (roomId: string) => void;
  closeBooking: () => void;
  bookingRoomId: string | null;
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
}

const UIContext = createContext<UIState | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingRoomId, setBookingRoomId] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);

  const openBooking = useCallback(() => {
    setBookingRoomId(null);
    setBookingOpen(true);
  }, []);
  const openBookingFor = useCallback((roomId: string) => {
    setBookingRoomId(roomId);
    setBookingOpen(true);
  }, []);
  const closeBooking = useCallback(() => setBookingOpen(false), []);

  return (
    <UIContext.Provider
      value={{
        bookingOpen,
        openBooking,
        openBookingFor,
        closeBooking,
        bookingRoomId,
        chatOpen,
        setChatOpen,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
