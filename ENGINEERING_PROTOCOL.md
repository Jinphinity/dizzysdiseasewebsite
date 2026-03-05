# Engineering Protocol: Frontend & Backend AI Split

## 1. Core Philosophy
To maintain the high-quality, immersive survival horror atmosphere of *Dizzy's Disease*, we heavily enforce a responsibility split between AI agents (or human developers) based on their comparative strengths.

- **Aesthetic/Frontend Engineer Focus:** Focuses purely on visual presentation, HTML/CSS structure, CSS animations, layout design, diegetic UI elements, and pre-rendering visuals. 
- **Backend/Systems Engineer Focus:** Focuses on the logical implementation, data architecture, state machine logic, backend connections, and making the static views functional dynamically.

## 2. Handoff Protocol
When the Frontend team defines a new feature, they must mock the visual implementation entirely using placeholder logic (e.g. creating the HTML/CSS for an inventory menu, building the DOM structure for a Retro OS). 

The Frontend team then updates `BACKEND_HANDOFF.md` (or a similar spec doc) with explicit instructions on what logic needs to be attached to those visual elements.

**CRITICAL RULE:** The Backend/Systems engineer is **NOT ALLOWED** to alter the established CSS classes, modify the visual layouts, or break the semantic structure of the DOM. They are only allowed to inject dynamic data, wire up event listeners, swap classes to trigger CSS states, and handle the backend data flow.

## 3. Designing for Modularity
When the Frontend team designs a feature (e.g., layered 3D objects, interactive lab equipment), the visual implementation must be built in a way that respects the limitations of the DOM while maximizing the aesthetic return. The backend logic must then consume that HTML/CSS API directly without requiring a visual rebuild.
