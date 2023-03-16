import Swal from 'sweetalert2'
import './App.css'
import {
    Button,
    FormControl,
    FormGroup,
    Input,
    Step, StepContent,
    StepLabel,
    Stepper,
    TextField,
    useStepContext
} from "@mui/material";
import React, {useEffect, useState} from "react";
import TimeEntry from "./TimeEntry";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export class LeaderboardEntry {
    name: string = ""
    time: number = 0

    constructor(name: string, time: number) {
        this.name = name;
        this.time = time;
    }
}
function App() {

    const [times, setTimes] = useState<LeaderboardEntry[]>([])

    const sortTimes = (times: LeaderboardEntry[]) => {
        const sortedTimes = times.slice().sort((a, b) => a.time - b.time);
        setTimes(sortedTimes);
        localStorage.setItem('times', JSON.stringify(times));
    }

    useEffect(() =>{
        if (localStorage.getItem("times")){
            sortTimes(JSON.parse(localStorage.getItem("times")!))
        }
    }, [])

    const onSubmit = () => {
        // @ts-ignore
        let name = document.getElementById("name")!.value
        // @ts-ignore
        let time = document.getElementById("time")!.value

        if (name.length == 0){
            throw new Error("Please enter a name!")
        }

        try {
            let minutes = Number(time.split(":")[0])
            let milliseconds = time.split(":")[2]
            if (3 - milliseconds.length !== 0){
                for (let i = 0; i < 4 - milliseconds.length; i++) {
                    milliseconds = "0" + milliseconds
                }
            }

            let seconds = Number(time.split(":")[1]) + minutes * 60 + Number(milliseconds) / 1000

            sortTimes([...times, {name: name, time: seconds}])

            // @ts-ignore
            document.getElementById("time")!.value = ""
            // @ts-ignore
            document.getElementById("name")!.value = ""
        }catch (error: any) {

                Swal.fire({
                    title: "Please Enter a Valid Format: MIN:S:MS",
                    toast: true,
                    showConfirmButton: false,
                    background: "#cc0000",
                    timerProgressBar: true,
                    timer: 2000,
                    icon: "error",
                    color: "white",
                    position: "bottom"
                })
            }
    }

    const onDelete = (
        event: React.MouseEvent<HTMLButtonElement>,
        deleteIndex: number
    ): void => {
        event.preventDefault();
        const newTimes = [...times];
        newTimes.splice(deleteIndex, 1);
        sortTimes(newTimes)
    };


    const handleKeyPress = (event: any) => {
        if(event.key === 'Enter'){
            onSubmit()
        }
    }

  return (
    <div className="App">
        <Stepper  className={"stepper"} orientation={"vertical"}>
            <Step className={"step"}>
                <StepLabel>Add Time</StepLabel>
                <StepContent>
                    <br/>
                    <br/>
                </StepContent>
            </Step>
            <Step>
                <StepLabel>View Times</StepLabel>
            </Step>
        </Stepper>
        <div className={"input"}>
                <TextField onKeyPress={() => handleKeyPress(event)} autoComplete={"off"} required placeholder={"Max Muster"} id={"name"} label={"Name"} variant={"outlined"}></TextField>
                <TextField onKeyPress={() => handleKeyPress(event)} autoComplete={"off"} required placeholder={"MIN:S:MS"} id={"time"} label={"Time"} variant={"outlined"}></TextField>
                <Button color={"success"} variant={"contained"} onClick={onSubmit}>Submit</Button>
        </div>
        <br/>
        <hr/>
        <div className="scoreboard">
            <div className="entrys">
                {times.map((value, index) => {
                    return <TimeEntry key={index} onDelete={onDelete} time={value.time} name={value.name} rank={index + 1}></TimeEntry>
                })}
            </div>

        </div>
    </div>
  )
}

export default App
