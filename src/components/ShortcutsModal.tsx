import { useEffect } from 'react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShortcutsModal({ isOpen, onClose }: ShortcutsModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shortcuts = {
    Navigation: [
      { key: '→', action: 'Save and go to Next Frame' },
      { key: '←', action: 'Go to Previous Frame' },
      { key: 'X', action: 'Skip Frame' },
    ],
    'Eye State': [
      { key: 'E', action: 'Label as Open' },
      { key: 'R', action: 'Label as Closed' },
    ],
    'Face Direction': [
      { key: 'W', action: 'Label as Up' },
      { key: 'S', action: 'Label as Down' },
      { key: 'A', action: 'Label as Left' },
      { key: 'D', action: 'Label as Right' },
      { key: 'Q', action: 'Label as Straight' },
    ],
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-lg shadow-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold text-card-foreground">Keyboard Shortcuts</h2>
        </div>
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {Object.entries(shortcuts).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-semibold text-muted-foreground mb-2">{category}</h3>
              <ul className="space-y-1">
                {items.map(({ key, action }) => (
                  <li key={key} className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{action}</span>
                    <kbd className="px-2 py-1 text-xs font-sans font-semibold bg-secondary text-secondary-foreground border border-border rounded">
                      {key}
                    </kbd>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="p-4 bg-secondary/50 text-right rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}
