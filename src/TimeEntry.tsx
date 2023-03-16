import "./App.css"
import {Card, IconButton, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

interface props {
    rank: number,
    name: string,
    time: number,
    onDelete: (
        event: React.MouseEvent<HTMLButtonElement>,
        deleteIndex: number
    ) => void;
}
export default function TimeEntry({rank, name, time, onDelete}: props) {


    return(
        <>
        <Card className={"card"}>
            <Typography className={"rank"} color="text.secondary" >
                {rank}. |
            </Typography>
             {name}: {time}s
        <IconButton className={"deleteButton"} onClick={(e) => onDelete(e, rank - 1)}>
            <DeleteIcon color={"error"}></DeleteIcon>
        </IconButton>
        </Card>
        </>
    )
}