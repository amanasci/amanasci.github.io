# Taste
- Prefers Playwright for browser automation and visual verification of web pages when browser tooling is needed; explicitly asks for it in those cases. Confidence: 0.7
- Approves structural/IA plans at a high level ("Go ahead and restructure") and expects the whole change carried out end-to-end from there, including new, renamed, and retired pages. Confidence: 0.5
- Holds back optional extras the agent proposes rather than folding them into the current task (e.g. "Let's leave CV PDF for now"); scope to what was asked. Confidence: 0.45
- Verifies finished work himself and does not want the agent to run browser/visual verification passes ("Don't use verification. I'll verify things manually."); when he says he has checked something manually, stop re-checking that step and move on to the next task. Confidence: 0.8
- Wants bio/publication content to match his real record and supplies the authoritative source (e.g. his Google Scholar profile URL) to pull it from, rather than accepting invented or placeholder copy. Confidence: 0.55
- Wants shared UI elements (e.g. the site nav bar) byte-for-byte identical across all pages, with `index.html` treated as the canonical reference to match. Confidence: 0.6
