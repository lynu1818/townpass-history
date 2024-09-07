import { Grid2, Typography, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { spots } from "../map/Spot";
import { useParams, useNavigate } from "react-router-dom";
import { withStyles } from "@mui/styles";

const styles = {
    img: {
        width: '80%',
        height: 'auto',
    },
    content: {
        width: '80%'
    },
    btnwrap: {
        width: '60%',
        border: '2px solid #5AB4C5',
        'border-radius': '10px',
    },
    btnfont: {
        color: '#5AB4C5',
    }
};


function Story(props) {
    const { classes } = props;
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
        <Grid2 container direction='column' rowSpacing={2}>
            <Grid2 container justifyContent='center' alignItems='center' >
                <Box
                    sx={{
                        width: 'auto',  // Set the width to 80% of the page
                        height: '200px', // Maintain aspect ratio
                    }}
                    component="img"
                    src={info.src}
                />
            </Grid2>
            <Grid2>
                <Typography variant="h4" className={classes.name}>{info.name}</Typography>
            </Grid2>
            <Grid2>
                <Typography variant="h6" className={classes.addr}>{info.address}</Typography>
            </Grid2>
            <Grid2 container justifyContent='center'>
                <Grid2 className={classes.content}>{info.detail}</Grid2>
            </Grid2>
            <Grid2 justifyContent='center' container>
                <Box className={classes.btnwrap}>
                    <Button variant='text' onClick={handleClick} className={classes.btn}>
                        <Typography variant="h6" className={classes.btnfont}>
                            確認
                        </Typography>
                    </Button>
                </Box>
            </Grid2>
        </Grid2>
    );
}

export default withStyles(styles)(Story);