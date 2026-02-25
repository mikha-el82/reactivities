import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

type Props = {
    activity: Activity;
    cancelSelectActivity: () => void;
    openForm: (id: string) => void;
    deleteActivity: (id: string) => void;
};
export const ActivityDetail = ({activity, cancelSelectActivity, openForm, deleteActivity}: Props) => {
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
              <Button size={"small"} color={"error"} onClick={() => deleteActivity(activity.id)}>Delete</Button>
          </CardActions>  
        </Card>
    );
};