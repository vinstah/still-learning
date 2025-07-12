import { create } from 'zustand';

interface ViewState {
  isNameEditing: boolean;
  tempName: string;
  startTime: number | null;
  currentLessonId: string | null;
  currentSlideIndex: number;
  showCertificate: boolean;

  setIsNameEditing: (editing: boolean) => void;
  setTempName: (name: string) => void;
  setStartTime: (time: number | null) => void;
  setCurrentLessonId: (id: string | null) => void;
  setCurrentSlideIndex: (index: number) => void;
  setShowCertificate: (show: boolean) => void;
}

export const useViewStore = create<ViewState>((set) => ({
  isNameEditing: false,
  tempName: 'Student',
  startTime: null,
  currentLessonId: null,
  currentSlideIndex: 0,
  showCertificate: false,

  setIsNameEditing: (editing) => set({ isNameEditing: editing }),
  setTempName: (name) => set({ tempName: name }),
  setStartTime: (time) => set({ startTime: time }),
  setCurrentLessonId: (id) => set({ currentLessonId: id }),
  setCurrentSlideIndex: (index) => set({ currentSlideIndex: index }),
  setShowCertificate: (show) => set({ showCertificate: show }),
})); 