// Turns text into HTML-safe text: <, >, &, " and ' become entities, so
// user content inserted into an HTML string can never become markup.
const replacements = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
}

export function escapeHtml(value) {
    if (value === null || value === undefined) return ''
    const text = String(value)
    return text.replace(/[&<>"']/g, char => replacements[char])
}
