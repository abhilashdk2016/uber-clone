// const create = <T>(type: (new () => T)): T => {
//     return new type();
// }

export const cleanNullArgs = (args: Object, type: any) : Object => {
    const notNullUpdateValues = new type();
    Object.entries(args).forEach(([_key, value]) => {
        const key = _key as keyof typeof args;
        if(value !== null) {
            notNullUpdateValues[key] = value;
        }
    });
    return notNullUpdateValues;
} 