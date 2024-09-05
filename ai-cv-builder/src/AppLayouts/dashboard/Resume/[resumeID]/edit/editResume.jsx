import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function EditResume() {
  const params = useParams()
  useEffect(()=>{
    console.log(params)
  },[]

)
  return (
    <div>
      <h1>hey editer</h1>
    </div>
  )
}

export default EditResume
