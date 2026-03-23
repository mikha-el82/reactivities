import { TextField } from "@mui/material";
import { useController } from "react-hook-form";

type Props = {
    name: string;
    control: any;
    label?: string;
    [key: string]: any;
};

export default function TextInput(props: Props) {
    const { field, fieldState } = useController({
        ...props,
        defaultValue: props.defaultValue || ''
    }); 
    
    return (
        <TextField 
            {...field}
            {...props}
            fullWidth={'true'}
            variant={"outlined"}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
        />
    );
}