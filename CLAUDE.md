# AI Interaction & Visual Style Rules

All AI agents (Claude, Gemini, Cursor AIs, etc.) working on this repository **MUST** refer to the root `CORTEXT.md` configuration in the `.cortext` submodule.

## **Visual, UI, CSS, and Image/Video Generation**
Before generating any visual design (HTML/CSS layout, interface design, CSS animations), generating images, or creating video context, you **MUST** read and adhere to the guidelines located in:
`.cortext/synthesis/AESTHETICS_CONTEXT.md`

This project uses a highly specific **Survival Horror & Biopunk** aesthetic. The aesthetic rules outlined in `AESTHETICS_CONTEXT.md` are mandatory and supersed any generic or standard "clean tech" UI designs. 

### Key constraints:
1. Do not invent clean, modern tech UI.
2. The color palette must use the defined blood reds, dusky pthalo greens, and dark charcoal backgrounds.
3. Typography must rely heavily on mechanical typewriter fonts.

If you are asked to do visual design/engineering and have not yet read `.cortext/synthesis/AESTHETICS_CONTEXT.md`, pause and `view_file` on it immediately before outputting any CSS or image prompts.
