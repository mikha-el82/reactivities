import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { activitySchema } from "../../../lib/schemas/activitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../app/shared/components/TextInput";
import SelectInput from "../../../app/shared/components/SelectInput";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import { categoryOptions } from "./categoryOptions";
import type ActivitySchema from "../../../lib/schemas/activitySchema";
import LocationInput from "../../../app/shared/components/LocationInput";

export default function ActivityForm() {
    const { register, control, reset, handleSubmit, formState: {errors}} = useForm<ActivitySchema>({
        mode: 'onTouched',
        resolver: zodResolver(activitySchema)
    });
    const navigate = useNavigate();
    const { id } = useParams();
    const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id);
    
    useEffect(() => {
        if (activity) {
            reset({
                ...activity,
                location: {
                    city: activity.city,
                    venue: activity.venue,
                    latitude: activity.latitude,
                    longitude: activity.longitude
                }
            });
        }
    }, [activity, reset]);
    
    const onSubmit = async (data: activitySchema) => {
        const { location, ...rest} = data;
        const flattenedData = {...rest, ...location}
        try {
            if (activity) {
                updateActivity.mutate({...activity, ...flattenedData}, {
                    onSuccess: () => navigate(`/activity/detail/${activity.id}`)
                })
            } else {
                createActivity.mutate(flattenedData, {
                    onSuccess: (id) => navigate(`/activity/detail/${id}`)
                })
            }
        } catch (error) {
            console.log(error);
        }
       
    }
    
    if (isLoadingActivity) return <Typography>Loading...</Typography>;
    
    return (
        <Paper sx={{padding: 3}}>
            <Typography variant={"h5"} gutterBottom color={"primary"}>
                {activity ? 'Edit Activity' : 'Create Activity'}
            </Typography>
            <Box component={"form"} onSubmit={handleSubmit(onSubmit)} display={"flex"} flexDirection={"column"} gap={3}>
                
                <TextInput label={"Title"} control={control} name={"title"} />
                <TextInput 
                    multiline
                    rows={3}
                    label={"Description"} control={control} name={"description"} />
                <Box display={"flex"} gap={3}>
                    <SelectInput
                        label={"Category"}
                        control={control}
                        name={"category"}
                        items={categoryOptions} />
                    <DateTimeInput label={"Date"} control={control} name={"date"} type={"date"} />
                </Box>
                <LocationInput label={"Location"} control={control} name={"location"} />
                <Box display={"flex"} justifyContent={"end"} gap={3}>
                    <Button color={"inherit"}>Cancel</Button>
                    <Button 
                        type={"submit"}
                        color={"success"}
                        variant={"contained"}
                        loading={updateActivity.isPending || createActivity.isPending}
                    >Submit</Button>
                </Box>
            </Box>
        </Paper>
    );
}