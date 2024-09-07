import { Grid2, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { spots } from "../map/Spot";


export function Story(props) {
    const [info, setInfo] = useState({})
    const getInfo = () => {
        const spotInfo = spots[props.id];
        console.log(spotInfo);
        setInfo(spotInfo);
    }

    useEffect(() => {
        if (Object.keys(info).length === 0)
            getInfo();
    }, [props.id])

    return (
        <>
            <Grid2 minHeight={150}>
                <Box
                    component="img"
                    sx={{
                        height: 150
                    }}
                    src={info.src}
                />
            </Grid2>
            <Typography variant="h4">{info.name}</Typography>
            <Typography variant="h6">{info.address}</Typography>
            <Grid2>{info.detail}</Grid2>
        </>
    );
}