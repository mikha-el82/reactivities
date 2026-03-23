import { DateTimePicker } from "@mui/x-date-pickers"
import { useController } from "react-hook-form";

type Props = {
    name: string;
    control: any;
    label?: string;
    [key: string]: any;
};

export default function DateTimeInput(props: Props) {
    const { field, fieldState } = useController({
        ...props,
        defaultValue: props.defaultValue || '',
    });
    
    return (
        <DateTimePicker
            {...props}
            value={field.value ? new Date(field.value) : null}
            onChange={
                (value) => {
                    field.onChange(new Date(value));
                }
            }
            sx={{width: '100%'}}
            slotProps={{textField: {
                    onBlur: field.onBlur,
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                }}}
        ></DateTimePicker>
    );
}