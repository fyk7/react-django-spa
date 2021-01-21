import React from 'react';
import clsx from 'clsx';
import Chart from "react-apexcharts";
import {
  Box,
  Card,
  CardContent,
  Grid,
  CardHeader,
  Button,
  Divider,
  makeStyles
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
}));

const ApexTest = ({className, ...rest}) => {
    const classes = useStyles();

    const data = {
        options: {
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
            }
          },
          series: [
            {
              name: "series-1",
              data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
          ]
        };
    
    return (
        <Card
          className={clsx(classes.root, className)}
          {...rest}
        >
            <CardHeader
                action={(
                <Button
                    endIcon={<ArrowDropDownIcon />}
                    size="small"
                    variant="text"
                >
                   Download csv 
                </Button>
                )}
                title="ApexTestChart"
            />
            <Divider />
            <CardContent>
                <Grid
                container
                justify="space-between"
                spacing={3}
                >
                    <Box>
                        <Chart
                        options={data.options}
                        series={data.series}
                        type="bar"
                        width="500"
                        />
                    </Box>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ApexTest;
