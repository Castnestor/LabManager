import React, { useEffect, useState } from 'react'
import List from '../components/List'
import { useAxios } from '../hooks/useAxios'
import axios from 'axios'

export default function TestsPage() {
  const [tests, setTests] = useState([]);

  useEffect( () => {
    const getData = async () => {
      const data = await axios.get("api/users");
      // console.log(data.data.data);
      setTests(data.data.data)
    }

    getData();
  },[])

  return (
    <div>
      <List data={tests} url="/api/users" options={[true, false]} deleteRow={false} />
    </div>
  )
}
