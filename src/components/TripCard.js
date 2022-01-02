import * as React from 'react';
import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from "./Table";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import './TripCard.css';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function TripCard({tripData}) {

  const columns = useMemo(
    () => [
      {
        // first group - TV Show
        Header: "Expenses",
        // First group columns
        columns: [
          {
            Header: "Name",
            accessor: "name"
          },
          {
            Header: "Amount",
            accessor: "amount"
          },
          {
            Header: "Paid By",
            accessor: "paidBy"
          },
          {
            Header: "Paid For",
            accessor: "paidFor"
          }
        ]
      },
    ],
    []
  );

  const [expenses, setExpenses] = useState();

  const handleCalculate = () => {
    let members = tripData.members;
    let json = members.reduce((acc,curr)=> (acc[curr]=0,acc),{});

    Object.keys(json).map((per) => {
      json[per] = members.reduce((acc,curr)=> (acc[curr]=0,acc),{});
    });

    tripData.expenses.map((exp) => {
      const splitAmt = exp.amount / exp.paidFor.length / exp.paidBy.length;
      exp.paidBy.map((p1) => {
        exp.paidFor.map((p2) => {
          json[p1][p2] -= splitAmt;
          json[p2][p1] += splitAmt;
        })
      })
    });

    setExpenses(json);
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {tripData.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          { tripData.startDate } - { tripData.endDate }
        </Typography>
        <span variant="body2" color="text.secondary">
          <Stack direction="row" spacing={1}>
            { tripData.members.map((per) => {
              return (
                <Item>{per}</Item>
              )
            })}
            <Button size="small">Edit Members</Button>
          </Stack>
          
        </span>
        <br /><Divider /><br />
        <span variant="body2" color="text.secondary">
          <Table columns={columns} data={tripData.expenses} />
        </span>
        {expenses &&
          <div>
            <br /><Divider /><br />
            <span variant="h3" color="text.primary">
              Expenses Owed:
            </span>
            <span variant="body2" color="text.secondary">
              <pre>{JSON.stringify(expenses, null, 2)}</pre>
            </span>
          </div>
        }
      </CardContent>
      <CardActions>
        <Button size="small">Edit Expenses</Button>
        <Button size="small" onClick={handleCalculate}>Calculate Expenses</Button>
      </CardActions>
    </Card>
  );
  
};