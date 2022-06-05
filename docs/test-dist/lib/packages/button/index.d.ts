import { ButtonHTMLAttributes, PropType } from "vue";
type Size = "xs" | "sm" | "md" | "lg" | "xl";
type Type = "default" | "text" | "primary" | "info" | "success" | "warning" | "error" | "purple" | undefined;
declare const _default: import("vue").DefineComponent<{
    type: {
        type: PropType<Type>;
        default: string;
    };
    size: {
        type: PropType<Size>;
        default: string;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    plain: {
        type: BooleanConstructor;
        default: boolean;
    };
    circle: {
        type: BooleanConstructor;
        default: boolean;
    };
    native: {
        type: PropType<ButtonHTMLAttributes>;
        default: {};
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    type: {
        type: PropType<Type>;
        default: string;
    };
    size: {
        type: PropType<Size>;
        default: string;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    plain: {
        type: BooleanConstructor;
        default: boolean;
    };
    circle: {
        type: BooleanConstructor;
        default: boolean;
    };
    native: {
        type: PropType<ButtonHTMLAttributes>;
        default: {};
    };
}>>, {
    type: Type;
    circle: boolean;
    size: Size;
    loading: boolean;
    disabled: boolean;
    round: boolean;
    plain: boolean;
    native: ButtonHTMLAttributes;
}>;
declare const EButton: typeof _default;
export { EButton as default, EButton };
