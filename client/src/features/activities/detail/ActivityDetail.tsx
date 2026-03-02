import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import {Link, useNavigate, useParams} from "react-router";

export const ActivityDetail = () => {
    const navigate = useNavigate(); 
    const { id } = useParams();
    const { activity, isLoadingActivity } = useActivities(id)
    const { deleteActivity } = useActivities();

    if (isLoadingActivity) return <Typography>Loading...</Typography>;
    if (!activity) return <Typography>Activity not found...</Typography>;
    
    
    return (
        <Card>
            <CardMedia
                component={"img"}
                src={`/images/categoryImages/${activity.category}.jpg`}
            />
            <CardContent>
                <Typography variant={"h5"}>{activity.title}</Typography>
                <Typography variant={"subtitle1"}>{activity.date}</Typography>
                <Typography variant={"body1"}>{activity.description}</Typography>
            </CardContent>
          <CardActions>
              <Button component={Link} to={`/activity/edit/${activity.id}`} size={"small"} color={"primary"}>Edit</Button>
              <Button size={"small"} color={"inherit"} onClick={() => navigate('/activities')}>Cancel</Button>
              <Button 
                  size={"small"}
                  color={"error"}
                  onClick={() => deleteActivity.mutate(activity.id)} 
                  loading={deleteActivity.isPending}>
                  Delete
              </Button>
          </CardActions>  
        </Card>
    );
};