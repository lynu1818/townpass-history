import { Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { spots } from "../map/Spot";


export function Story(props) {
    const [info, setInfo] = useState({})
    const getInfo = () => {
        setInfo(spots[props.id]);
    }

    useEffect(() => {
        if (Object.keys(info).length === 0)
            getInfo();
    })

    return (
        <>
            <Grid2 minHeight={150}>
                hi
            </Grid2>
            <Typography variant="h4">{info.name}</Typography>
            <Typography variant="h6">{info.address}</Typography>
            <Grid2>{info.detail}</Grid2>
        </>
    );
}