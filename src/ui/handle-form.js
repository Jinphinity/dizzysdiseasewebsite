import { getRoute } from '../content/routes.js';

/**
 * Handles form submissions (terminal puzzle and contact form).
 * Returns { statusMessage, puzzleStatus, contactStatus, needsRender }.
 */
export async function handleFormSubmit({
    formType,
    form,
    routePath,
    engine,
    contactService,
    analytics,
    audio
}) {
    if (formType === 'terminal') {
        const code = form.elements.code?.value ?? '';
        const result = engine.attemptTerminalUnlock(code);

        if (result.unlocked) {
            analytics.track('puzzle_unlock', { route: routePath });
            audio.play('success');
            return {
                statusMessage: 'Puzzle solved using archive intelligence.',
                puzzleStatus: { ok: true, message: 'Terminal unlocked. Bonus operations content enabled.' },
                contactStatus: null,
                needsRender: true
            };
        }

        analytics.track('puzzle_attempt_failed', { route: routePath, reason: result.reason });
        audio.play('miss');
        return {
            statusMessage: 'Terminal remains locked.',
            puzzleStatus: { ok: false, message: 'Incorrect keyphrase. Search archive logs for the access term.' },
            contactStatus: null,
            needsRender: true
        };
    }

    if (formType === 'contact') {
        const route = getRoute(routePath);
        const payload = {
            name: form.elements.name?.value ?? '',
            email: form.elements.email?.value ?? '',
            message: form.elements.message?.value ?? '',
            route: routePath
        };

        const result = await contactService.submit({
            endpoint: route.contact?.formEndpoint,
            payload
        });

        if (result.ok) {
            analytics.track('contact_submit', { route: routePath, mode: result.mode });
            audio.play('success');
            form.reset();
            return {
                statusMessage: 'Contact transmission processed.',
                puzzleStatus: null,
                contactStatus: { ok: result.ok, message: result.message },
                needsRender: true
            };
        }

        audio.play('miss');
        return {
            statusMessage: 'Contact transmission failed.',
            puzzleStatus: null,
            contactStatus: { ok: result.ok, message: result.message },
            needsRender: true
        };
    }

    return { statusMessage: null, puzzleStatus: null, contactStatus: null, needsRender: false };
}
