
import ButtonTransformer from "@/render/transformer/leaf/ButtonTransformer";
import {Validator} from "@ilyapavlenko/core";
import {IdKindProps} from "@/render/transformer/type";


export default function LeafIndex({id, kind}:IdKindProps)
{
    if (Validator.EntitiesKindButton.safeParse(kind).success)
        return <ButtonTransformer id={id} kind={kind}/>;

    if (Validator.EntitiesKindText.safeParse(kind).success)
        return <ButtonTransformer id={id} kind={kind}/>;

    return null;
}
