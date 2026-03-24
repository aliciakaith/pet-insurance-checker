export type PetType = 'dog' | 'cat'

export interface CoverageRequest {
  petName: string
  petType: PetType
  condition: string
  coveragePercentage: 60 | 70 | 80 | 90
}

export interface CoverageResult {
  verdict: 'covered' | 'partial' | 'not_covered'
  confidence: 'high' | 'medium' | 'low'
  explanation: string
  estimatedReimbursement: {
    min: number
    max: number
    percentage: number
  }
  whatToDoNext: string[]
  importantCaveats: string[]
}