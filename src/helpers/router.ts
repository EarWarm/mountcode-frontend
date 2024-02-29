export function replaceParams(path: string, ...params: string[]): string {
    if (!params || params.length <= 0) {
        return path;
    }

    for (let i = 0; i < params.length; i++) {
        path = path.replace("{" + i + "}", params[i]);
    }

    return path;
}