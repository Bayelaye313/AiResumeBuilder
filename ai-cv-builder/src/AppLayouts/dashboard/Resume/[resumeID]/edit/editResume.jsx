import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../Rescomponents/formSection'
import ResPreview from '../../Rescomponents/resPreview'
import { InfosContext } from '@/HandleContext/InfosContext'
import dumping from '@/data/dumping'

function EditResume() {
  const params = useParams()
  const [resumeInfos, setResumeInfos] = useState()
  useEffect(()=>{
    setResumeInfos(dumping)
  },[]

)
  return (
    <InfosContext.Provider value = {{resumeInfos, setResumeInfos}}>
      <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10 '>
        <FormSection/>
        <ResPreview/>
      </div>
    </InfosContext.Provider>
  )
}

export default EditResume
