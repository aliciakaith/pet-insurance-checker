import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { CoverageRequest, CoverageResult } from '@/types/coverage'

const client = new Anthropic()

export async function POST(request: NextRequest) {
  try {
    const body: CoverageRequest = await request.json()
    const { petName, petType, condition, coveragePercentage } = body

    const message = await client.messages.create({
      model: 'claude-opus-4-5',
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
- Dental injury and illness that develop after policy start (if no prior dental history, vet checked teeth in last 12 months)
- Food provided by vet while hospitalised, or vet-recommended food for chronic conditions (up to 1 month)
- Emergency boarding at licensed kennel/cattery for up to 2 weeks if owner is hospitalised
- Behavioural cover for diagnosed behavioural disorders (if no prior history)
- Physiotherapy and hydrotherapy if vet recommends it
- End of life / euthanasia costs if condition is covered
- Snake bites
- Tick and parasite infections (if appropriate licensed prevention product was used)
- Vaccinatable diseases (if vaccinations are up to date)
- One course of acupuncture or cold laser therapy
- Hip, elbow, and knee replacements if vet recommends
- Up to $30,000 AUD cover per 12 months
- Hereditary and congenital conditions (if not pre-existing)

WAITING PERIODS:
- Injury: 2 days
- Illness: 30 days
- Cruciate ligaments, Patellar Luxation, Hip Dysplasia, Elbow Dysplasia, BOAS, Cherry Eye: 90 days
- Waiting periods can be skipped if pet health is verified in-app

REIMBURSEMENT:
- Customer chosen coverage percentage: ${coveragePercentage}%
- Fetch pays ${coveragePercentage}% of covered costs after the excess is applied
- Annual limit: up to $30,000 AUD per 12 months
- Estimate reimbursement based on typical Australian vet costs for the condition in AUD

WHAT FETCH AUSTRALIA DOES NOT COVER:
- Pre-existing conditions (any condition present before cover or during waiting periods)
- Routine care: vaccinations, parasite control, bathing, grooming, clipping
- Dental health checks, descaling, polishing, prophylaxis, x-rays for dental health
- Fractured or missing teeth unless caused by a specific known injury
- Desexing and complications from desexing
- Breeding-related costs, pregnancy, giving birth
- Elective and cosmetic procedures
- Open heart surgery, pacemakers, organ transplants, cancer vaccination, stem cell therapy (except osteoarthritis)
- Accessories (cages, collars, toys, etc)
- Administration fees
- Anal gland emptying (unless abscess or tumour)
- Microchipping and registration
- Experimental surgery or treatments
- Cloning or genetic material storage/testing
- Issues caused by negligence, malnutrition, obesity, poor hygiene
- Commercial or working dogs (guarding, racing, hunting, law enforcement)
- Restricted or dangerous breeds
- Treatment must be provided by a vet registered and located in Australia
- Epidemics and pandemics as defined by the Australian Government
- Notifiable diseases as defined by the Department of Health or Department of Agriculture
- Acts of war or terrorism
- Effects of nuclear/radioactive materials, riots or civil unrest
- Illegal acts

Respond ONLY with a valid JSON object in exactly this shape, no markdown, no extra text:
{
  "verdict": "covered" | "partial" | "not_covered",
  "confidence": "high" | "medium" | "low",
  "explanation": "2-3 sentence plain english explanation",
  "estimatedReimbursement": {
    "min": number in AUD dollars,
    "max": number in AUD dollars,
    "percentage": reimbursement percentage as number (e.g. 70, 80, 90)
  },
  "whatToDoNext": ["step 1", "step 2", "step 3"],
  "importantCaveats": ["caveat 1", "caveat 2"]
}`
        }
      ]
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    const result: CoverageResult = JSON.parse(text)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Coverage API error:', error)
    return NextResponse.json(
      { error: 'Failed to check coverage' },
      { status: 500 }
    )
  }
}