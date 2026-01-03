'use client';
import {useStoreMap} from "effector-react";
import ButtonUI from "@/render/render/ui/ButtonUI";
import {IdKindProps} from "@/render/transformer/type";
import {$buttons, getActionId} from "@ilyapavlenko/core";

function ButtonTransformer({id, kind}:IdKindProps)
{
    const button = useStoreMap({
        store: $buttons,
        keys: [id],
        fn: (map, [id]) => map.get(id),
    });

    const actions = getActionId({id, kind});

    if (!button)
        return null;

    return <ButtonUI data={button} action={actions}/>
}

export default ButtonTransformer;