import { useController } from "react-hook-form";
import { TextField, Typography,Box, List, ListItemButton, debounce } from "@mui/material"
import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import type { LocationIQSuggestion } from "../../../lib/types/index"

type Props = {
    name: string;
    control: any;
    label?: string;
    [key: string]: any;
};

export default function LocationInput(props: Props) {
    const { field, fieldState } = useController({
        ...props,
        defaultValue: props.defaultValue || ''
    });
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]);
    const [inputValue, setInputValue] = useState(field.value || '');


    useEffect(() => {
        if (field.value && typeof field.value === 'object') {
            setInputValue(field.value.venue || '');
        } else {
            setInputValue(field.value || '');
        }
    }, [field.value]);
    
    const locationUrl = 'https://api.locationiq.com/v1/autocomplete?key=pk.2c3681e09522ccf3c146834ab84d4786&limit=5&dedupe=1&'
    
    const fetchSuggetions = useMemo(
        () => debounce(async (query: string) => {
            if (!query || query.length < 3) {
                setSuggestions([]);
                return;
            }
            
            setLoading(true);
            try {
                const res = await axios.get<LocationIQSuggestion[]>(`${locationUrl}q=${query}`)
                setSuggestions(res.data);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }, 500), [locationUrl]
    )
    
    const handleChange = async (value: string) => {
        field.onChange(value);
        await fetchSuggetions(value);
    }
    
    const handleSelect = (location: LocationIQSuggestion) => {
        const city = location.address?.city || location.address?.town || location.address?.village;
        const venue = location.display_name;
        const latitude = location.lat;
        const longitude = location.lon;
        
        setInputValue(venue);
        field.onChange({city, venue, latitude, longitude});
        setSuggestions([]);
    }
    
    return (
        <Box>
            <TextField
                {...props}
                value={inputValue}
                onChange={e => handleChange(e.target.value)}
                fullWidth
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
            />
            {loading && <Typography>Loading...</Typography>}
            {suggestions.length > 0  && (
                <List sx={{border: 1}}>
                    {suggestions.map(suggestion => (
                        <ListItemButton
                            divider
                            key={suggestion.place_id}
                            onClick={() => {
                                handleSelect(suggestion)
                            }}
                        >
                            {suggestion.display_name}  
                        </ListItemButton>
                    )) }
                </List>
            )}
        </Box>
    );
}