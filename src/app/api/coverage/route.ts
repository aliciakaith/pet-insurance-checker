import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { CoverageRequest, CoverageResult } from '@/types/coverage'

const client = new Anthropic()

export async function POST(request: NextRequest) {
  try {
    const body: CoverageRequest = await request.json()
    const { petName, petType, condition, coveragePercentage } = body

    const message = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `You are a Fetch pet insurance coverage expert for Fetch Australia (fetchpet.com.au). A user wants to know if their ${petType} named ${petName} is covered for: "${condition}" under their plan with ${coveragePercentage}% reimbursement.

Here is Fetch Australia's actual policy from their PDS:

WHAT FETCH AUSTRALIA COVERS:
- Vet consultation fees as part of diagnosis and treatment
- Injuries: consultations, tests, diagnosis, treatment, hospitalisation
- Illnesses: consultations, tests, diagnosis, treatment, hospitalisation
- Prescribed medications (including shampoo/skin treatments for diagnosed skin conditions)
- Dental injury and illness that develop after policy start
- Emergency boarding at licensed kennel/cattery for up to 2 weeks if owner is hospitalised
- Behavioural cover for diagnosed behavioural disorders (if no prior history)
- Physiotherapy and hydrotherapy if vet recommends it
- End of life / euthanasia costs if condition is covered
- Snake bites
- Tick and parasite infections (if appropriate prevention product was used)
- Vaccinatable diseases (if vaccinations are up to date)
- Hip, elbow, and knee replacements if vet recommends
- Up to $30,000 AUD cover per 12 months
- Hereditary and congenital conditions (if not pre-existing)

WAITING PERIODS:
- Injury: 2 days
- Illness: 30 days
- Cruciate ligaments, Patellar Luxation, Hip Dysplasia, Elbow Dysplasia, BOAS, Cherry Eye: 90 days

REIMBURSEMENT:
- Customer chosen coverage percentage: ${coveragePercentage}%
- Fetch pays ${coveragePercentage}% of covered costs after the excess is applied
- Annual limit: up to $30,000 AUD per 12 months
- Estimate reimbursement based on typical Australian vet costs in AUD

WHAT FETCH AUSTRALIA DOES NOT COVER:
- Pre-existing conditions
- Routine care: vaccinations, parasite control, bathing, grooming
- Desexing and complications from desexing
- Breeding-related costs, pregnancy, giving birth
- Elective and cosmetic procedures
- Open heart surgery, pacemakers, organ transplants, cancer vaccination
- Accessories, administration fees, microchipping
- Experimental surgery or treatments
- Commercial or working dogs
- Restricted or dangerous breeds
- Epidemics, pandemics, acts of war or terrorism

Respond ONLY with a valid JSON object in exactly this shape, no markdown, no extra text:
{
  "verdict": "covered" or "partial" or "not_covered",
  "confidence": "high" or "medium" or "low",
  "explanation": "2-3 sentence plain english explanation",
  "estimatedReimbursement": {
    "min": number in AUD,
    "max": number in AUD,
    "percentage": number
  },
  "whatToDoNext": ["step 1", "step 2", "step 3"],
  "importantCaveats": ["caveat 1", "caveat 2"]
}`
        }
      ]
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    const clean = text.replace(/```json|```/g, '').trim()
    const result: CoverageResult = JSON.parse(clean)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Coverage API error:', error)
    return NextResponse.json(
      { error: 'Failed to check coverage' },
      { status: 500 }
    )
  }
}