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
        setData(resp)
        })
  },[page]);
  const previousPage= () => {
    if(page === 0) {
      setPage(page)
      window.history.pushState({}, undefined, `/page/${page}`);
    }
    else{
      setPage(page-1);
      window.history.pushState({}, undefined, `/page/${page-1}`);
    }
  };
    const nextPage= () => {
      if(page ===2) {
        window.history.pushState({}, undefined, `/page/${page}`);
        setPage(page);
      }
      else{
        window.history.pushState({}, undefined, `/page/${page+1}`);
        setPage(page+1);
      }
  };
  const lastPage= () => {
     window.history.pushState({}, undefined, `/page/${2}`);
    setPage(2);
  };
  const firstPage= () => {
    setPage(0);
    window.history.pushState({}, undefined, `/page/${0}`);
  };
    const customStyle = {cursor:'not-allowed'};
    const normal = { cursor: 'pointer'};
    const blockedPrevious = page=== 0 ? customStyle : normal;
    const blockedNext = page=== 2 ? customStyle : normal;
    

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th></th>
            <th>Precio</th>
            <th>Id</th>
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
        <button style= {blockedPrevious} className="first-page-btn" onClick = {firstPage}>first</button>
        <button style= {blockedPrevious} className="previous-page-btn"  onClick = {previousPage}>previous</button>
        <button style= {blockedNext} className="next-page-btn" onClick = {nextPage} >next</button>
        <button style= {blockedNext} onClick = {lastPage} className="last-page-btn" >last</button>
      </section>
    </div>
  );
};
