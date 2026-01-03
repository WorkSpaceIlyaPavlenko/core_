'use client';
import {IdKindProps} from "@/render/transformer/type";
import {useStoreMap} from "effector-react";

import Container from "@/render/render/blocks/Container";
import {$container_children, $containers, getActionId} from "@ilyapavlenko/core";


export default function ContainerTransformer({id, kind}:IdKindProps)
{
    const container = useStoreMap({
        store:$containers,
        keys:[id],
        fn: (map, [id]) => map.get(id),
    })

    const childrenIds = useStoreMap({
        store:$container_children,
        keys:[id],
        fn: (map, [id]) => map.get(id),
    }) ?? [];

    const actions = getActionId({id, kind});

    if (!container)
        return null;


    return <Container
        data={container}
        action={actions}
        childrenIds={childrenIds}
    />
}