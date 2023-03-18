import "./App.css"
import 'animate.css';
import {Card, IconButton, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useEffect, useState} from "react";

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

    const [delay, setDelay] = useState(0.5);

    useEffect(() => {
        if ((rank ) == 1){
            // @ts-ignore
            document.getElementById("1").style.backgroundColor = "#bebc24"
        }
        if ((rank ) == 2){
            // @ts-ignore
            document.getElementById("2").style.backgroundColor = "#9ea7a9"
        }
        if ((rank ) == 3){
            // @ts-ignore
            document.getElementById("3").style.backgroundColor = "#793838"
        }
    }, []);


    return(
        <>
        <Card id={rank.toString()} className={"card animate__animated animate__fadeInUp"}>
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