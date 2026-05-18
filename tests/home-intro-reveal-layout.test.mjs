import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8")
const introComponent = readFileSync(new URL("../components/home-intro-reveal.tsx", import.meta.url), "utf8")

function ruleBody(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const match = css.match(new RegExp(`${escaped}\\s*\\{(?<body>[^}]*)\\}`))
  assert.ok(match?.groups?.body, `Missing CSS rule for ${selector}`)
  return match.groups.body
}

test("home intro text uses left-center-right layout centered on the viewport", () => {
  const textRule = ruleBody(".home-intro-reveal__text")

  assert.match(textRule, /top:\s*50%/)
  assert.match(textRule, /transform:\s*translate3d\(0,\s*-50%,\s*0\)/)
  assert.match(textRule, /display:\s*grid/)
  assert.match(textRule, /grid-template-columns:\s*minmax\(0,\s*1fr\)\s+auto\s+minmax\(0,\s*1fr\)/)
  assert.match(textRule, /align-items:\s*center/)
})

test("home intro lines occupy the left, center, and right positions", () => {
  assert.match(ruleBody(".home-intro-reveal__line:nth-child(1)"), /justify-self:\s*start/)
  assert.match(ruleBody(".home-intro-reveal__line:nth-child(2)"), /justify-self:\s*center/)
  assert.match(ruleBody(".home-intro-reveal__line:nth-child(3)"), /justify-self:\s*end/)
  assert.match(ruleBody(".home-intro-reveal__line + .home-intro-reveal__line"), /margin-top:\s*0/)
})

test("home intro rhythm gives the text enough quiet reading time before reveal", () => {
  const lineRule = ruleBody(".home-intro-reveal__line")
  const firstTileRule = ruleBody(".home-intro-reveal__tile:nth-child(1)")
  const lastTileRule = ruleBody(".home-intro-reveal__tile:nth-child(4)")

  assert.match(introComponent, /INTRO_DURATION_MS\s*=\s*3900/)
  assert.match(lineRule, /animation:\s*home-intro-line\s+2200ms/)
  assert.match(firstTileRule, /animation-delay:\s*2400ms/)
  assert.match(lastTileRule, /animation-delay:\s*2760ms/)
})

test("home intro typography is quiet and close to the reference site", () => {
  const lineRule = ruleBody(".home-intro-reveal__line")

  assert.match(lineRule, /color:\s*rgba\(255,\s*255,\s*255,\s*0\.68\)/)
  assert.match(lineRule, /font-size:\s*clamp\(0\.72rem,\s*0\.9vw,\s*0\.95rem\)/)
  assert.match(lineRule, /font-weight:\s*400/)
  assert.match(lineRule, /letter-spacing:\s*0/)
})
