import 'dotenv/config'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import Anthropic from '@anthropic-ai/sdk'
import { I18N_DIR } from '../config.js'

const LOCALE_NAMES = {
  fr: 'French',
  de: 'German',
  'zh-hans': 'Chinese Simplified',
}

const BATCH_SIZE = 50

async function translate(locale) {
  if (!LOCALE_NAMES[locale]) {
    console.error(`Unknown locale: ${locale}. Valid: ${Object.keys(LOCALE_NAMES).join(', ')}`)
    process.exit(1)
  }

  const enPath = join(I18N_DIR, 'en.json')
  const outPath = join(I18N_DIR, `${locale}.json`)

  const en = JSON.parse(await readFile(enPath, 'utf8'))

  let existing = {}
  try { existing = JSON.parse(await readFile(outPath, 'utf8')) } catch {}

  // Only translate keys that don't already have a value
  const missing = Object.entries(en).filter(([k]) => !existing[k])
  if (!missing.length) {
    console.log(`✓ ${locale}: nothing new to translate (${Object.keys(existing).length} strings already translated)`)
    return
  }

  console.log(`Translating ${missing.length} strings to ${LOCALE_NAMES[locale]}...`)

  const client = new Anthropic()
  const result = { ...existing }

  // Process in batches to stay within token limits
  for (let i = 0; i < missing.length; i += BATCH_SIZE) {
    const batch = Object.fromEntries(missing.slice(i, i + BATCH_SIZE))

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system: `You are a professional translator for Cubewise, an IBM Planning Analytics / TM1 software consultancy. Translate UI strings from English to ${LOCALE_NAMES[locale]}.

Rules:
- Keep the tone expert, clear, and professional. Never casual.
- Do NOT translate brand names: Cubewise, Arc, Arc+, Pulse, Slice, Atmosphere, PowerConnect, IBM, IBM Planning Analytics, TM1, TM1py, Bedrock, RushTI, OptimusPy, Power BI.
- Do NOT translate URLs, HTML entities, or technical terms.
- Preserve HTML entities (e.g. &amp; &rarr; &hellip;) exactly as-is.
- Return ONLY a valid JSON object with the same keys as the input. No commentary.`,
      messages: [{
        role: 'user',
        content: `Translate these strings to ${LOCALE_NAMES[locale]}:\n\n${JSON.stringify(batch, null, 2)}`,
      }],
    })

    let translated
    try {
      translated = JSON.parse(message.content[0].text)
    } catch {
      console.error('Failed to parse translation response:', message.content[0].text)
      process.exit(1)
    }

    Object.assign(result, translated)
    console.log(`  ${Math.min(i + BATCH_SIZE, missing.length)}/${missing.length} done`)
  }

  // Write keeping keys in same order as en.json
  const en_keys = Object.keys(en)
  const ordered = Object.fromEntries(en_keys.filter(k => result[k]).map(k => [k, result[k]]))

  await mkdir(I18N_DIR, { recursive: true })
  await writeFile(outPath, JSON.stringify(ordered, null, 2) + '\n')
  console.log(`✓ Wrote ${outPath} (${Object.keys(ordered).length} strings)`)
}

// CLI: node scripts/translate.js --locale fr
const localeArg = process.argv[process.argv.indexOf('--locale') + 1]
if (!localeArg) {
  console.error('Usage: node scripts/translate.js --locale <fr|de|zh-hans>')
  process.exit(1)
}
await translate(localeArg)
