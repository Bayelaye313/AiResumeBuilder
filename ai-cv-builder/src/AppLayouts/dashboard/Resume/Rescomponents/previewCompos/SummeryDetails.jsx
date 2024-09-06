import React from 'react'

function SummeryDetails({resumeInfos}) {
  return (
    <p className='text-xs'>
    {resumeInfos?.summery}
</p>
  )
}

export default SummeryDetails
