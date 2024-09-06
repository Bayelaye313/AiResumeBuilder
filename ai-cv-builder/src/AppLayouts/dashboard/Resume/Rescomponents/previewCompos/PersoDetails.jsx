import React from 'react'

function PersoDetails({resumeInfos}) {
  return (
    <div>

        <h2 className='text-center text-xl font-bold' style={{
        color:resumeInfos?.themeColor}} > {resumeInfos?.firstName} {resumeInfos?.lastName} </h2>
        <h2 className='text-center text-xs font-medium' > {resumeInfos?.jobTitle}</h2>
        <h2 className='text-center text-xs font-normal' style={{
        color:resumeInfos?.themeColor}}> {resumeInfos?.address}</h2>
            <div className='flex justify-between'>
            <h2 className='text-xs font-normal' style={{
        color:resumeInfos?.themeColor}} > {resumeInfos?.phone}</h2>
             <h2 className='text-xs font-normal' style={{
        color:resumeInfos?.themeColor}} > {resumeInfos?.email}</h2>
            </div>
            <hr className='border-[1.5px] my-2'
        style={{
            borderColor:resumeInfos?.themeColor
        }}
        />
    </div>
  )
}

export default PersoDetails
