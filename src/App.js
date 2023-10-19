import React, { useState, useEffect } from 'react';
import './App.css'
import {TbPointFilled} from "react-icons/tb"

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [gpo, setgpo] = useState('priority');
  const [sto, setsto] = useState(null);

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => response.json())
      .then((data) => setTickets(data));
  }, []);


  const so = ['Priority', 'Title'];
  const go = ['Priority', 'User', 'Status'];

  const fun = () => {
    let arr = {};
    for (const x of tickets) {
      const groupKey = gpo === 'Status' ? x.status : gpo === 'User' ? x.userId : tickets.priority;
      arr[groupKey].push(x);
    }

    for (const x in arr) {
      if (sto === 'Priority') {
        arr[x].sort((a, b) => b.priority > a.priority);
      } else if (sortingOption === 'Title') {
        arr[x].sort((a, b) => a.title >b.title);
      }
    }
    return arr;
  };

  return (
    <div>
      <div className='nav'>
     
      <div >
        <label>Group by: </label>
        <select onChange={(e) => setGroupingOption(e.target.value)} value={groupingOption}>
          {go.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Sort by: </label>
        <select onChange={(e) => setSortingOption(e.target.value)} value={sortingOption}>
          {so.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
      </div>
      <div className='main'>
      <h2 className='name'>Grouping by <b>{groupingOption}</b> is selected.</h2>
      <div className='row'>
        {Object.entries(groupedAndSortedTickets()).map(([group, groupTickets]) => (
          <div key={group} className='col'>
            <div className='name' >
                <span className='nameset'>{group}</span>     
            </div>
            
            {groupTickets.map((ticket) => (
              <div key={ticket.id} className='box'>
                <p className='userman'>{ticket.userId}</p>
                <div className='na'><TbPointFilled/>{ticket.title}</div>  
                <p>{ticket.priority}</p>        
              </div>
            ))}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default App;
