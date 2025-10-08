import { useState, useEffect, useCallback } from 'react';
import { HelpCircle } from 'lucide-react';
import { ImageUploader } from '@/components/ImageUploader';
import { VideoPlayer } from '@/components/VideoPlayer';
import { ControlPanel } from '@/components/ControlPanel';
import { LabelingInterface } from '@/components/LabelingInterface';
import { ShortcutsModal } from '@/components/ShortcutsModal';
import { ThemeToggle } from '@/components/ThemeToggle';

interface Annotation {
  open_closed: string;
  direction: string;
}

interface Annotations {
  [key: number]: Annotation;
}

export default function Index() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [frames, setFrames] = useState<string[]>([]);
  const [currentFrameId, setCurrentFrameId] = useState(1);
  const [totalFrames, setTotalFrames] = useState(0);
  const [annotations, setAnnotations] = useState<Annotations>({});
  const [currentAnnotation, setCurrentAnnotation] = useState<Annotation>({
    open_closed: '',
    direction: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleThemeToggle = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const fetchAnnotation = useCallback(
    (frameId: number) => {
      setCurrentAnnotation(annotations[frameId] || { open_closed: '', direction: '' });
    },
    [annotations]
  );

  const saveAnnotation = useCallback((frameId: number, annotation: Annotation) => {
    if (annotation.open_closed || annotation.direction) {
      setAnnotations((prev) => ({ ...prev, [frameId]: annotation }));
    }
  }, []);

  const handleNext = useCallback(() => {
    saveAnnotation(currentFrameId, currentAnnotation);
    if (currentFrameId < totalFrames) setCurrentFrameId((p) => p + 1);
  }, [currentFrameId, currentAnnotation, totalFrames, saveAnnotation]);

  const handlePrevious = useCallback(() => {
    saveAnnotation(currentFrameId, currentAnnotation);
    if (currentFrameId > 1) setCurrentFrameId((p) => p - 1);
  }, [currentFrameId, currentAnnotation, saveAnnotation]);

  const handleSkip = useCallback(() => {
    if (currentFrameId < totalFrames) setCurrentFrameId((p) => p + 1);
  }, [currentFrameId, totalFrames]);

  const handleAnnotationChange = useCallback((category: string, value: string) => {
    setCurrentAnnotation((prev) => ({ ...prev, [category]: value }));
  }, []);

  const handleFilesUpload = (uploadedFiles: FileList) => {
    const fileUrls = Array.from(uploadedFiles)
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
      .map((file) => URL.createObjectURL(file));
    setFrames(fileUrls);
    setTotalFrames(fileUrls.length);
    setCurrentFrameId(1);
  };

  useEffect(() => {
    if (frames.length > 0) fetchAnnotation(currentFrameId);
  }, [currentFrameId, frames, fetchAnnotation]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (frames.length === 0 || isModalOpen) return;
      const keyMap: { [key: string]: () => void } = {
        arrowleft: handlePrevious,
        arrowright: handleNext,
        x: handleSkip,
        e: () => handleAnnotationChange('open_closed', 'Open'),
        r: () => handleAnnotationChange('open_closed', 'Closed'),
        w: () => handleAnnotationChange('direction', 'Up'),
        s: () => handleAnnotationChange('direction', 'Down'),
        a: () => handleAnnotationChange('direction', 'Left'),
        d: () => handleAnnotationChange('direction', 'Right'),
        q: () => handleAnnotationChange('direction', 'Straight'),
      };
      const action = keyMap[e.key.toLowerCase()];
      if (action) {
        e.preventDefault();
        action();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    frames.length,
    isModalOpen,
    handlePrevious,
    handleNext,
    handleSkip,
    handleAnnotationChange,
  ]);

  if (frames.length === 0) {
    return <ImageUploader onFilesSelect={handleFilesUpload} />;
  }

  return (
    <>
      <ShortcutsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="bg-background text-foreground min-h-screen font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8 transition-colors duration-300">
        <div className="w-full max-w-7xl">
          <header className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary">
                Frame Annotation Tool
              </h1>
              <p className="text-sm text-muted-foreground">
                Label eye state and face direction for each frame.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="View keyboard shortcuts"
              >
                <HelpCircle className="h-6 w-6" />
              </button>
              <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
            </div>
          </header>

          <main className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 flex flex-col gap-4">
              <VideoPlayer frameUrl={frames[currentFrameId - 1]} frameId={currentFrameId} />
              <ControlPanel
                onPrevious={handlePrevious}
                onNext={handleNext}
                onSkip={handleSkip}
                currentFrame={currentFrameId}
                totalFrames={totalFrames}
              />
            </div>
            <div className="lg:col-span-2">
              <LabelingInterface
                annotation={currentAnnotation}
                onAnnotationChange={handleAnnotationChange}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
