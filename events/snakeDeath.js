export function dispatchSnakeDiedEvent(map) {
    const snakeDied = new CustomEvent("snakeDied", {
        detail: {},
    });

    map.dispatchEvent(snakeDied)
}