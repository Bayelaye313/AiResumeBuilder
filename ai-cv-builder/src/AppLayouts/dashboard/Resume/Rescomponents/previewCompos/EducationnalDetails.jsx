import React from 'react'

function EducationnalDetails({resumeInfos}) {
  return (
    <div className='my-6'>
    <h2 className='text-center font-bold text-sm mb-2'
    style={{
        color:resumeInfos?.themeColor
    }}
    >Education</h2>
    <hr style={{
        borderColor:resumeInfos?.themeColor
    }} />

    {resumeInfos?.education.map((education,index)=>(
        <div key={index} className='my-5'>
            <h2 className='text-sm font-bold'
                style={{
                    color:resumeInfos?.themeColor
                }}
            >{education.universityName}</h2>
            <h2 className='text-xs flex justify-between'>{education?.degree} in {education?.major}
            <span>{education?.startDate} - {education?.endDate}</span>
            </h2>
            <p className='text-xs my-2'>
                {education?.description}
            </p>
        </div>
    ))}

    </div>
  )
}

export default EducationnalDetails
