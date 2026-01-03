
import {Validator} from "@ilyapavlenko/core";

import {IdKindProps} from "@/render/transformer/type";
import ContainerTransformer from "@/render/transformer/composite/ContainerTransofrmer";


export default function CompositeIndex({id, kind}:IdKindProps)
{
    if (Validator.EntitiesKindContainer.safeParse(kind).success)
        return <ContainerTransformer id={id} kind={kind}/>

    return null;
}