import {Button, Card, CardActions, CardContent, Chip, Typography} from "@mui/material";
import { Link } from "react-router";

type Props ={
    activity: Activity;
}
export default function ActivityCard({ activity }: Props) {
    return (
        <Card>
            <CardContent>
                <Typography variant={"h5"}>{activity.title}</Typography>
                <Typography sx={{color: "text.secondary", mb: 1}}>{activity.date}</Typography>
                <Typography variant={"body2"}>{activity.description}</Typography>
                <Typography variant={"subtitle1"}>{activity.city} / {activity.venue}</Typography>
                <CardActions sx={{display: "flex", justifyContent: "space-between", pb: 2}}>
                    <Chip label={activity.category} variant="outlined" />
                    <Button 
                        size={"medium"} 
                        variant={"contained"} 
                        component={Link}
                        to={`/activity/detail/${activity.id}`}
                        >
                        View
                    </Button>
                </CardActions>
            </CardContent>
        </Card>    
    );
}