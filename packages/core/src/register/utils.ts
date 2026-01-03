import {RuntimeChildrenId} from "@/core/engine/type";


type WithId = {
    id: string
}

type WithProps<P extends object = object> = {
    props: P
}

export function register<T extends WithId>(map: Map<string, T>, config: T): Map<string, T>
{
    if (!config.id)
        return map;

    const next = new Map(map);
    next.set(config.id, config);

    return next;
}


export function update<T extends WithId & WithProps>(map: Map<string, T>, { id, patch }: { id: string; patch: Partial<T> }): Map<string, T>
{
    const config = map.get(id);
    if (!config)
        return map;

    if (!patch.props)
        return map;

    const next = new Map(map);

    next.set(id, {
        ...config,
        ...patch,
        props: {
            ...config.props,
            ...patch.props,
        },
    });

    return next;
}

export function updateChildren<T extends WithId>(map: Map<string, T[]>, { id, children }: { id: string; children: T[] }): Map<string, T[]>
{
    if (!children.length)
        return map;

    const prev = map.get(id) ?? [];

    const merged = new Map<string, T>();

    for (const item of prev)
        merged.set(item.id, item);

    for (const item of children)
        merged.set(item.id, item);

    const next = new Map(map);
    next.set(id, [...merged.values()]);

    return next;
}

export function removeChildren<T extends WithId>(map: Map<string, T[]>, { id, children }: { id: string; children: T[] }): Map<string, T[]>
{
    if (!children.length)
        return map;

    const prev = map.get(id);
    if (!prev)
        return map;

    const removeIds = new Set(children.map(c => c.id));
    const filtered = prev.filter(c => !removeIds.has(c.id));

    const next = new Map(map);

    if (filtered.length)
        next.set(id, filtered);
    else
        next.delete(id);

    return next;
}



