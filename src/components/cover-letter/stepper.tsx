"use client"

import { Check } from "lucide-react"

interface Step {
  number: number
  title: string
  description: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors
                  ${
                    step.number < currentStep
                      ? "bg-green-500 text-white"
                      : step.number === currentStep
                        ? "bg-orange-400 text-white"
                        : "bg-navy-900 text-white"
                  }
                `}
              >
                {step.number < currentStep ? <Check className="w-5 h-5" /> : step.number}
              </div>
              <div className="mt-2 text-center">
                <div className="text-xs font-medium text-navy-900">{step.title}</div>
                <div className="text-xs text-gray-500 hidden sm:block">{step.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
