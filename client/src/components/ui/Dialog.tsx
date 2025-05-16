import type { ReactNode } from "react";

interface DialogProps {
  open: boolean;
  onOpenChange: () => void;
  children: ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="bg-white rounded-lg p-4 shadow-2xl max-w-sm w-full border-4 border-secondary ">
        {children}
        <button
          type="button"
          onClick={onOpenChange}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded  justify-items-center hidden"
        >
          Sauvegarder
        </button>
      </div>
    </div>
  );
}

export function DialogContent({ children }: { children: ReactNode }) {
  return <div className="mt-2">{children}</div>;
}

export function DialogHeader({ children }: { children: ReactNode }) {
  return <div className="text-lg font-bold mb-2">{children}</div>;
}

export function DialogTitle({ children }: { children: ReactNode }) {
  return <h2>{children}</h2>;
}

export function DialogDescription({ children }: { children: ReactNode }) {
  return <p>{children}</p>;
}
