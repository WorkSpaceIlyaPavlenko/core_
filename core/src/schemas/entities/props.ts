import { z } from "zod";

export const NodeAstStateSchema = z.object({
    visible: z.boolean().optional(),
    disabled: z.boolean().optional(),
    active: z.boolean().optional(),
    loading: z.boolean().optional(),
});


export const AstButtonPropsSchema = z.object({
    className: z.string().optional(),
    classNameImgWp: z.string().optional(),
    classNameImg: z.string().optional(),
    classNameSvg: z.string().optional(),

    importance: z.enum(['default', 'main', 'supplementary']).optional(),
    backgroundStyle: z.string().optional(),

    text: z.string().optional(),

    img: z.unknown().optional(),
    svg: z.unknown().optional(),

    imgLocation: z.enum(['left', 'right']).optional(),
    imgWidth: z.number().optional(),
    imgHeight: z.number().optional(),
});

export const RuntimePropsButtonSchema =
    AstButtonPropsSchema.and(NodeAstStateSchema);


export const HtmlTagSchema = z.custom<keyof HTMLElementTagNameMap>(
    (value) => {
        if (typeof value !== 'string') return false;
        if (typeof document === 'undefined') return false;
        return document.createElement(value).toString() !== '[object HTMLUnknownElement]';
    },
    { message: 'Invalid HTML tag name' }
);

export const AstTextPropsSchema = z.object({
    className: z.string().optional(),

    text: z.union([z.string(), z.number()]).optional(),

    animateTyping: z.boolean().optional(),
    typingSpeed: z.number().optional(),
    startDelay: z.number().optional(),
});

export const AstTextInitialStateSchema = z.object({
    tag: HtmlTagSchema,
});


export const RuntimePropsTextSchema =
    AstTextPropsSchema
        .and(AstTextInitialStateSchema)
        .and(NodeAstStateSchema);

export const LayoutTypeSchema = z.enum([
    'FlexLayout',
    'GridLayout',
    'AbsoluteLayout',
    'InlineLayout',
    'DefaultLayout',
]);

export const AstContainerCoreSchema = z.object({
    kind: z.literal('container'),
    layout: LayoutTypeSchema.optional(),
});



export const AstContainerPropsSchema = z.object({
    className: z.string().optional(),

    display: z.enum(['flex', 'grid', 'inline']).optional(),
    direction: z.enum(['row', 'column']).optional(),
    align: z.enum(['start', 'center', 'end']).optional(),
    gap: z.number().optional(),
    position: z.enum([
        'absolute',
        'relative',
        'fixed',
        'static',
        'sticky',
    ]).optional(),
});


export const RuntimePropsContainerSchema =
    AstContainerPropsSchema.and(NodeAstStateSchema);

const PropsSchema = {
    NodeAstStateSchema,

    AstButtonPropsSchema,
    RuntimePropsButtonSchema,

    AstTextPropsSchema,
    AstTextInitialStateSchema,
    RuntimePropsTextSchema,

    AstContainerCoreSchema,
    AstContainerPropsSchema,
    RuntimePropsContainerSchema,
};

export default PropsSchema;
