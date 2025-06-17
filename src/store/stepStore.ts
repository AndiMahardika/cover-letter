// store/stepStore.ts
import { create } from 'zustand'

export type StepsStore = {
  currentStep: number
  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  resetStep: () => void
}

export const useStepsStore = create<StepsStore>((set) => ({
  currentStep: 1,
  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 3) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
  resetStep: () => set((state) => ({currentStep: state.currentStep = 1}))
}))
