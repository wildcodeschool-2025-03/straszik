import { type ReactNode, createContext, useContext, useState } from "react";

interface ContextInterface {
  children: ReactNode;
}

interface BasketInterface {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
}

interface BasketContext {
  basket: BasketInterface[];
  setBasket: React.Dispatch<React.SetStateAction<BasketInterface[]>>;
}
const BasketContext = createContext<BasketContext | null>(null);

export function BasketProvider({ children }: ContextInterface) {
  const [basket, setBasket] = useState<BasketInterface[]>([]);
  return (
    <BasketContext.Provider value={{ basket, setBasket }}>
      {children}
    </BasketContext.Provider>
  );
}

export const useBasket = () => {
  const value = useContext(BasketContext);

  if (value == null) {
    throw new Error("useTheme has to be used within <BasketProvider>");
  }

  return value;
};
