import { Box, Button, colors, Grid2, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { spots } from "../map/Spot";
import { useParams, useNavigate } from "react-router-dom";

const styles = {
    icon: {
        width: '100%',
        height: 'auto',
    },
    question: {
        width: '80%',
        margin: '0 auto',
    },
    option: {
        width: '80%',
        height: '100%',
        border: '2px solid #5AB4C5',
        'border-radius': '10px',
    },
    optionBtn: {
        width: '100%',
        height: '100%',
    },
    optionFont: {
        color: '#5AB4C5',
    }
};

function Question(props) {
    const { classes } = props;
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
        <Grid2 container direction="column" spacing={2}>
            <Grid2 container justifyContent='space-around'>
                <Grid2 size={4} wrap="wrap">
                    <Box
                        className={classes.icon}
                        component="img"
                        src='../../img/Bearr-removebg-preview.png'
                    />
                </Grid2>
                <Grid2 size={4}>
                    <Box
                        className={classes.icon}
                        component="img"
                        src='../../img/QuestionMark_-removebg-preview.png'
                    />

                </Grid2>
            </Grid2>

            <Grid2 className={classes.question}>
                <Typography variant="h6">{que}</Typography>
            </Grid2>

            {opt.map((ele, id) => {
                return (
                    <Grid2 key={id} container alignItems='center' justifyContent='center'>
                        <Box
                            className={classes.option}
                        >
                            <Button
                                variant="text"
                                className={classes.optionBtn}
                                onClick={() => checkAns(ele)}
                            >
                                <Typography variant="h6" className={classes.optionFont}>
                                    {ele}
                                </Typography>
                            </Button>
                        </Box>
                    </Grid2>
                );
            })}
        </Grid2>
    );
}

export default withStyles(styles)(Question);