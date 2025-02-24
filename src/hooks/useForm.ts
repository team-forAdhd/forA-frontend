import React, { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';

type FieldValues = Record<string, any>;

export type ValidationValue = boolean | number | string | RegExp;
type ValidationRule<
    TValidationValue extends ValidationValue = ValidationValue,
> = TValidationValue;

type RegisterReturn<
    TFieldValues extends FieldValues,
    TFieldName extends keyof TFieldValues,
> = {
    ref: React.RefObject<TextInput>;
    name: TFieldName;
    onChangeText?: (text: string) => void;
    onBlur?: () => void;
};

type RegisterOptions<
    TFieldValues extends FieldValues,
    TFieldName extends keyof TFieldValues,
> = Partial<{
    required?: ValidationRule<boolean>;
    onChangeText?: (text: string) => void;
    onBlur?: () => void;
}>;

type useFormRegister<TFieldValues extends FieldValues> = <
    TFieldName extends keyof TFieldValues,
>(
    fieldName: TFieldName,
    options?: RegisterOptions<TFieldValues, TFieldName>,
) => RegisterReturn<TFieldValues, TFieldName>;

type UseFormProps<TFieldValues extends FieldValues = FieldValues> = {
    values: TFieldValues;
    defaultValues: Partial<Record<keyof TFieldValues, string>>;
    disabled?: boolean;
};

type UseFormReturn<TFieldValues extends FieldValues = FieldValues> = {
    register: useFormRegister<TFieldValues>;
    handleSubmit: (onSubmit: (values: TFieldValues) => void) => void;
};

type FormState<TFieldValues extends FieldValues> = {
    defaultValues?: Partial<Record<keyof TFieldValues, string>>;
    isValid: boolean;
    errors: Record<keyof TFieldValues, string> | {};
};

function createFormControl<TFieldValues extends FieldValues = FieldValues>(
    props: UseFormProps<TFieldValues>,
): UseFormReturn<TFieldValues> {
    const observer:
        | Record<keyof TFieldValues, { regex?: RegExp; defaultValue?: string }>
        | {} = {};
    let _formState: FormState<TFieldValues> = {
        isValid: false,
        errors: {},
    };

    function register<TFieldName extends keyof TFieldValues>(
        fieldName: TFieldName,
        options?: RegisterOptions<TFieldValues, TFieldName>,
    ): RegisterReturn<TFieldValues, TFieldName> {
        const ref = React.createRef<TextInput>();

        return {
            ref,
            name: fieldName,
            onChangeText: (text: string) => {
                options?.onChangeText?.(text);
            },
            onBlur: () => {
                options?.onBlur?.();
            },
        };
    }

    const handleSubmit =
        (onSubmit: (values: TFieldValues) => void) =>
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
        };

    return { register, handleSubmit };
}

export function useForm<TFieldValues extends FieldValues = FieldValues>(
    props: UseFormProps<TFieldValues>,
): UseFormReturn<TFieldValues> {
    const _formControl = useRef<UseFormReturn<TFieldValues> | undefined>(
        undefined,
    );
    const _values = useRef<typeof props.values | undefined>(undefined);
    const [formState, _setFormState] = useState<FormState<TFieldValues>>({
        defaultValues: props.defaultValues,
        errors: {},
        isValid: false,
    });

    if (!_formControl.current) {
        const newformControl = createFormControl(props);
        _formControl.current = {
            ...newformControl,
        };
    }

    return _formControl.current;
}
