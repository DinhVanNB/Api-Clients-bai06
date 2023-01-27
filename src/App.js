import {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
  let [users, setUser] =useState([]);
  useEffect(
    ()=> async ()=>{ 
      try{
          const data= await  axios.get("http://localhost:3001/api/users");
          const dataArticle = await axios.get("http://localhost:3001/api/Article");
          setUser(rev =>rev =(data.data).map(user=>{ 
              return {
                ...user,
                article: (dataArticle.data).filter(item =>{
                    return item.user_id ===user.id
                }) 
              }
          }))
        }
      catch(e){
            console.log(e)
          }
      }
  ,[])
  return (
    <div>
        <h1>User</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Article title</th>
            </tr>
          </thead>
          <tbody>
          {users.map(user=> (
              <tr key={user.id}>
                <td> {user.name} </td>
                <td> {user.article[0].title} </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}

export default App;
