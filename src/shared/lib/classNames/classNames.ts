export type Mods = Record<string, boolean | string | undefined>;

export function classNames(cls: string, mods: Mods = {}, additional: Array<string | undefined> = []): string {
    return [
        cls,
        ...additional.filter(Boolean),
        ...Object.entries(mods)
            // className, value
            .filter(([, value]) => {
                return Boolean(value);
            })
            .map(([className]) => {
                return className;
            }),
    ].join(' ');
}
