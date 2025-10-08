import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ControlPanelProps {
  onPrevious: () => void;
  onNext: () => void;
  onSkip: () => void;
  currentFrame: number;
  totalFrames: number;
}

interface ControlButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

function ControlButton({ onClick, children, disabled, variant = 'secondary' }: ControlButtonProps) {
  const baseClasses =
    'flex items-center justify-center px-4 py-2.5 font-semibold rounded-md shadow-sm transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring text-sm disabled:cursor-not-allowed disabled:opacity-50';

  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
}

export function ControlPanel({ onPrevious, onNext, onSkip, currentFrame, totalFrames }: ControlPanelProps) {
  return (
    <div className="bg-card p-4 rounded-lg shadow-md flex flex-col items-center gap-4 border border-border">
      <div className="text-lg font-mono text-foreground">
        Frame: <span className="font-semibold text-primary">{currentFrame}</span> / {totalFrames}
      </div>
      <div className="grid grid-cols-3 gap-2 w-full max-w-md">
        <ControlButton onClick={onPrevious} disabled={currentFrame <= 1}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </ControlButton>
        <ControlButton onClick={onSkip}>Skip Frame</ControlButton>
        <ControlButton onClick={onNext} disabled={currentFrame >= totalFrames} variant="primary">
          Save & Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </ControlButton>
      </div>
    </div>
  );
}
