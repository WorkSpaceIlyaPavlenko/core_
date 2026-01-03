'use client'
import {ActionTypeTest} from "@/render/render/type";
import LeafIndex from "@/render/transformer/LeafIndex";
import {RuntimeContainerRegister} from "@ilyapavlenko/core";
import {RuntimeChildrenId} from "@/render/transformer/type";



export default function Container(
    {data, action, childrenIds}:
    {data:RuntimeContainerRegister, action:ActionTypeTest, childrenIds:RuntimeChildrenId[]}
)
{
    const {display, visible, align, gap, position, direction} = data.props

    return (
        <div style={{display, gap, position, justifyContent:align, flexDirection:direction}}>
            {childrenIds.map(child=>
                <LeafIndex
                    key={child.id + '_' + child.kind}
                    id={child.id}
                    kind={child.kind}
                />
            )}
        </div>
    )
}