import { FormControl, MenuItem, Select, FormHelperText, InputLabel } from "@mui/material";
import { useController } from "react-hook-form";

type Props = {
    name: string;
    control: any;
    label?: string;
    [key: string]: any;
    items: {text: string, value: string}[];
};

export default function SelectInput(props: Props) {
    const { field, fieldState } = useController({
        ...props,
        defaultValue: props.defaultValue || '',
    });

    return (
        <FormControl fullWidth error={!!fieldState.error}>
            <InputLabel>{props.label}</InputLabel>
            <Select 
            value={field.value}
            label={props.label}
            onChange={field.onChange}
            onBlur={field.onBlur}
            >
                {props.items.map(item => (
                    <MenuItem key={item.value} value={item.value}>
                        {item.text}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
    );
}