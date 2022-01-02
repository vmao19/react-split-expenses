import { useState, useEffect } from 'react';
import './App.css';
import TripLayout from './components/TripLayout';

const tripData = [
  {
    "key": 1,
    "name": "Yosemite 2022",
    "startDate": new Date(2022, 0, 1).toDateString(),
    "endDate": new Date(2022, 0, 1).toDateString(),
    "members": ["Victor", "Marshall", "Mom", "Dad"],
    "expenses": [
      {
        "key": 1,
        "name": "Rental Car",
        "amount": 100,
        "paidBy": ["Victor"],
        "paidFor": ["Victor", "Marshall", "Mom", "Dad"]
      },
      {
        "key": 2,
        "name": "Gas",
        "amount": 40,
        "paidBy": ["Victor", "Marshall"],
        "paidFor": ["Victor", "Marshall", "Mom", "Dad"]
      }
    ]
  },
  {
    "key": 2,
    "name": "Trip 2",
    "startDate": new Date(2022, 0, 1).toDateString(),
    "endDate": new Date(2022, 0, 1).toDateString(),
    "members": ["Victor", "Marshall", "Mom", "Dad"],
    "expenses": [
      {
        "key": 1,
        "name": "Rental Car",
        "amount": 100,
        "paidBy": ["Victor"],
        "paidFor": ["Victor", "Marshall", "Mom", "Dad"]
      },
      {
        "key": 2,
        "name": "Gas",
        "amount": 40,
        "paidBy": ["Victor", "Marshall"],
        "paidFor": ["Victor", "Marshall", "Mom", "Dad"]
      }
    ]
  }
];

export default function App() {
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleInputUpdate = (event) => {
    setInputText(event.target.value);
  };

  function handleAddMember(id) {
    if (inputText.length === 0)
      return;

    const newData = data.map((item) => {
      if (item.key === id) {
        const updatedItem = {
          ...item,
          members: item.members.push(inputText),
        };

        return updatedItem;
      }

      return item;
    });

    console.log(newData);

    setData(newData);

    
  }

  useEffect(() => {
    setData(tripData);
  }, []);

  function BuildColumns() {
    let c3 = tripData.map((trip) => {
      console.log('trip: ' + trip['members']);
      trip['members'].map((name) => {
        console.log('member: ' + name);
        return {
          Header: name,
          accessor: 'member.' + name
        }
      })
    })
    console.log('c3: ' + c3);
    let c2 = Object.values(tripData[0]['members']).map((key, id)=>{
      console.log('key' + key);
      return {
        Header: key,
        accessor: 'member.'+key
      }
    })
    console.log('c2: ' + c2);

    let c = [
      {
        // first group - TV Show
        Header: "Expenses",
        // First group columns
        columns: [
          {
            Header: "Id",
            accessor: "expenses.id"
          },
          {
            Header: "name",
            accessor: "expenses.name"
          },
          {
            Header: "Amount",
            accessor: "expenses.amount"
          }
        ]
      },
      {
        Header: "Members",
        columns: {c2}
      }
    ];
    console.log(tripData[0]['members']);

    console.log(c);
    return c;
  };

  return (
    <div>
      <TripLayout trips={ data }/>
    </div>
  )
}