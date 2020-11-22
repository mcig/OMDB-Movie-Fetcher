import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  mediaExpanded: {
    height: 0,
    paddingTop: "450px",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ReviewCard({ data }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const {
    Title,
    Plot,
    Director,
    Actors,
    Poster,
    Ratings,
    Released,
    Awards,
    Language,
  } = data;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={Title}
        subheader={`${Released} By ${Director}`}
      />
      <CardMedia
        className={expanded ? classes.mediaExpanded : classes.media}
        image={Poster}
        title={Title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {Plot}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography color="secondary" paragraph>
            Top Actors:
          </Typography>
          {Actors.split(", ").map((actor, idx) => {
            return (
              <Typography key={idx} paragraph>
                {actor}
              </Typography>
            );
          })}
          <Typography color="secondary" paragraph>
            Ratings:
          </Typography>
          {Ratings.map((rating, idx) => {
            return (
              <Typography key={idx} paragraph>
                {rating.Source}: {rating.Value}
              </Typography>
            );
          })}
          <Typography color="secondary" paragraph>
            About:
          </Typography>
          <Typography paragraph>The Movie {Awards}</Typography>
          <Typography>It is available in {Language}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
