import { CheckCircle, AlertCircle } from 'lucide-react';

interface Annotation {
  open_closed: string;
  direction: string;
}

interface LabelingInterfaceProps {
  annotation: Annotation;
  onAnnotationChange: (category: string, value: string) => void;
}

interface RadioOptionProps {
  name: string;
  label: string;
  value: string;
  checked: boolean;
  onChange: () => void;
}

function RadioOption({ name, label, value, checked, onChange }: RadioOptionProps) {
  return (
    <label
      className={`flex items-center justify-center text-center cursor-pointer p-3 rounded-md transition-all duration-200 border-2 font-semibold text-sm ${
        checked
          ? 'bg-primary border-primary text-primary-foreground shadow-sm'
          : 'bg-secondary border-border hover:bg-secondary/80 text-secondary-foreground'
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span>{label}</span>
    </label>
  );
}

interface AnnotationGroupProps {
  title: string;
  name: string;
  options: { label: string; value: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
}

function AnnotationGroup({ title, name, options, selectedValue, onChange }: AnnotationGroupProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-muted-foreground mb-3">{title}</h3>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <RadioOption
            key={option.value}
            name={name}
            {...option}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
          />
        ))}
      </div>
    </div>
  );
}

export function LabelingInterface({ annotation, onAnnotationChange }: LabelingInterfaceProps) {
  const isAnnotated = annotation.open_closed && annotation.direction;

  const eyeStateOptions = [
    { label: 'Open', value: 'Open' },
    { label: 'Closed', value: 'Closed' },
  ];

  const directionOptions = [
    { label: 'Up', value: 'Up' },
    { label: 'Down', value: 'Down' },
    { label: 'Left', value: 'Left' },
    { label: 'Right', value: 'Right' },
    { label: 'Straight', value: 'Straight' },
  ];

  return (
    <div className="bg-card p-6 rounded-lg shadow-md space-y-6 h-full border border-border flex flex-col">
      <h2 className="text-xl font-bold text-card-foreground">Label Annotation</h2>
      
      <AnnotationGroup
        title="Category 1: Eye State"
        name="open_closed"
        options={eyeStateOptions}
        selectedValue={annotation.open_closed}
        onChange={(v) => onAnnotationChange('open_closed', v)}
      />
      
      <AnnotationGroup
        title="Category 2: Face Direction"
        name="direction"
        options={directionOptions}
        selectedValue={annotation.direction}
        onChange={(v) => onAnnotationChange('direction', v)}
      />
      
      <div className="flex-grow"></div>
      
      <div
        className={`flex items-center p-3 rounded-md transition-colors duration-300 ${
          isAnnotated
            ? 'bg-success/10 text-success border border-success/20'
            : 'bg-warning/10 text-warning border border-warning/20'
        }`}
      >
        {isAnnotated ? (
          <CheckCircle className="h-5 w-5 mr-2" />
        ) : (
          <AlertCircle className="h-5 w-5 mr-2" />
        )}
        <span className="font-semibold text-sm">
          {isAnnotated ? 'Annotation ready to save.' : 'Select all labels.'}
        </span>
      </div>
    </div>
  );
}
