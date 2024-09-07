import { Box, Button, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { spots } from "../map/Spot";
import { useParams, useNavigate } from "react-router-dom";

export function Question() {
    const [que, setQue] = useState("");
    const [opt, setOpt] = useState([]);
    const [ans, setAns] = useState("");
    const { libraryId } = useParams(); // 提取 path 中的 libraryId
    const navigate = useNavigate();

    const getQue = () => {
        // const q = spots[props.id].question;
        const q = spots[libraryId].question;
        setQue(q);
        let oriOpt = [
            // spots[props.id].option1,
            // spots[props.id].option2,
            // spots[props.id].option3,
            // spots[props.id].option4,
            spots[libraryId].option1,
            spots[libraryId].option2,
            spots[libraryId].option3,
            spots[libraryId].option4,
        ];
        setAns(oriOpt[0]);
        for (let i = 1; i < 4; i++) {
            let j = Math.floor(Math.random() * i);
            let tmp = oriOpt[i];
            oriOpt[i] = oriOpt[j];
            oriOpt[j] = tmp;
        }
        setOpt(oriOpt);
    };

    const checkAns = (cho) => {
        if (cho == ans) {
            navigate('/congrats/' + libraryId);
        } else {
            navigate('/false/' + libraryId);
        }
    };

    useEffect(() => {
        if (que === "") getQue();
    }, []);

    return (
        <>
            <Grid2 container direction="column" spacing={2}>
                <Grid2 container>
                    <Grid2 size={3}>A</Grid2>
                    <Grid2 size={6}></Grid2>
                    <Grid2 size={3}>B</Grid2>
                </Grid2>

                <Grid2>
                    <Typography variant="h6">{que}</Typography>
                </Grid2>

                {opt.map((ele, id) => {
                    return (
                        <Grid2 key={id}>
                            <Box>
                                <Button
                                    variant="text"
                                    sx={{ width: 100, height: 100 }}
                                    onClick={() => checkAns(ele)}
                                    className="option"
                                >
                                    <Typography variant="h6">{ele}</Typography>
                                </Button>
                            </Box>
                        </Grid2>
                    );
                })}
            </Grid2>
        </>
    );
}
