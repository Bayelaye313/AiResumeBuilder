import { Notebook } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

function ResumeCards({ resume }) {
  // Vérifie que resume et resume.attributes ne sont pas undefined
  const resumeId = resume?.id;
  const title = resume?.attributes?.title || "No Title Available";

  if (!resumeId) {
    console.warn('Resume ID is missing or undefined', resume);
  }

  return (
    <Link to={resumeId ? `/dashboard/resume/${resumeId}/edit` : '#'}>
      <div className='p-14 bg-secondary flex items-center 
       justify-center h-[280px] border border-blue-700 rounded-lg
       hover:scale-105 transition-all hover:shadow-md to-blue-800'>
        <Notebook />
      </div>
      <h2 className='text-center text-xl my-1'>{title}</h2>
    </Link>
  );
}

export default ResumeCards;
