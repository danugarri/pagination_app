import React, {useState, useEffect} from 'react';

const USERS_URL = `http://localhost:9000/list`;

export default function Table () {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
    
  useEffect(() => {
      const queryString = `/${page}`
      const getData = async () => await fetch(USERS_URL+queryString);
      getData()
      .then(response => response.json())
      .then(resp => {
        setData(resp.results)
        })
  },[page]);

    const customStyle = {cursor:'not-allowed'};
    const normal = { cursor: 'pointer'};
    const buttonStyle = data.length === 0 ?customStyle : normal;

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
        
        {
          data.map((item, index) => {
            const row= Object.values(item);

            return (
              <tr key = {index}> 
              {
                row.map((cell, rowIndex) =>  <td key= {rowIndex}>{cell}</td>) 
              }
            </tr>
            )
          })
        }
        
        </tbody>
      </table>
      <section className="pagination">
        <button style= {buttonStyle} className="first-page-btn" onClick = {() => setPage(0)}>first</button>
        <button style= {buttonStyle} className="previous-page-btn"  onClick = {() => setPage(page-1)}>previous</button>
        <button style= {buttonStyle} className="next-page-btn" onClick = {() => setPage(page+1)} >next</button>
        <button style= {buttonStyle} className="last-page-btn" >last</button>
      </section>
    </div>
  );
};
