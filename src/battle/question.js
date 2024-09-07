import { Box, Button, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { spots } from "../map/Spot";

export function Question(props) {

    const [que, setQue] = useState('');
    const [opt, setOpt] = useState([]);
    const [ans, setAns] = useState('');

    const getQue = () => {
        const q = spots[props.id].question;
        setQue(q);
        let oriOpt = [
            spots[props.id].option1,
            spots[props.id].option2,
            spots[props.id].option3,
            spots[props.id].option4
        ];
        setAns(oriOpt[0]);
        for (let i = 1; i < 4; i++) {
            let j = Math.floor(Math.random() * i);
            let tmp = oriOpt[i];
            oriOpt[i] = oriOpt[j];
            oriOpt[j] = tmp;
        }
        setOpt(oriOpt);
    }

    const checkAns = (cho) => {
        if (cho == ans) {
            alert('Correct!');
        } else {
            alert('Oh, no!');
        }
    }

    useEffect(() => {
        if (que === '') getQue();
    }, []);

    return (
        <>
            <Grid2 container direction='column' spacing={2}>
                <Grid2 container >
                    <Grid2 size={3}>A</Grid2>
                    <Grid2 size={6}></Grid2>
                    <Grid2 size={3}>B</Grid2>
                </Grid2>

                <Grid2>
                    <Typography variant="h6">
                        {que}
                    </Typography>
                </Grid2>

                {
                    opt.map((ele, id) => {
                        return (
                            <Grid2 key={id}>
                                <Box>
                                    <Button variant="text" sx={{ width: 100, height: 100 }} onClick={() => checkAns(ele)}>
                                        <Typography variant="h6">
                                            {ele}
                                        </Typography>
                                    </Button>
                                </Box>
                            </Grid2>
                        );
                    })
                }

            </Grid2>
        </>
    );
}