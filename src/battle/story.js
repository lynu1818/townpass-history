import { Grid2, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { spots } from "../map/Spot";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";


export function Story() {
    const [info, setInfo] = useState({})
    const { libraryId } = useParams();
    const navigate = useNavigate();
    const getInfo = () => {
        const spotInfo = spots[libraryId];
        setInfo(spotInfo);
    }

    const handleClick = () => {
        navigate('/');
    }

    useEffect(() => {
        if (Object.keys(info).length === 0)
            getInfo();
    }, [libraryId])

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
            <Button onClick={handleClick}>
                確認
            </Button>
        </>
    );
}