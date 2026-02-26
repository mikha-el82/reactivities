import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
    selectedActivity: Activity;
    cancelSelectActivity: () => void;
    openForm: (id: string) => void;
};
export const ActivityDetail = ({selectedActivity, cancelSelectActivity, openForm}: Props) => {
    const {activities} = useActivities();
    const activity = activities?.find(activity => activity.id === selectedActivity.id);
    const {deleteActivity, } = useActivities();
    
    if (!activity) return <Typography>Loading...</Typography>;
    
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
              <Button size={"small"} color={"primary"} onClick={() => openForm(activity.id)}>Edit</Button>
              <Button size={"small"} color={"inherit"} onClick={cancelSelectActivity}>Cancel</Button>
              <Button 
                  size={"small"}
                  color={"error"}
                  onClick={() => {
                      deleteActivity.mutate(activity.id, {
                          onSuccess: () => {
                              cancelSelectActivity();
                          }
                      });
                  }} 
                  loading={deleteActivity.isPending}>
                  Delete
              </Button>
          </CardActions>  
        </Card>
    );
};