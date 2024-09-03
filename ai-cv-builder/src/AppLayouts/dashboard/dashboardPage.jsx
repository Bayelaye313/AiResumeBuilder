import AddResume from "./components/addResume"

function DashboardPage() {
  return (
   <div className="p-8 md:px-20 lg:px-32">
      <h1 className="font-bold text-lg">My Resume</h1>
      <p>Make your resume stand out by quickly customizing it to each 
      application and applying to more jobs.</p>
      <div className="grid grid-cols-2 
                      md:grid-cols-3 
                      lg:grid-cols-5 
                      mt-10">
        <AddResume/>
      </div>
   </div>
    
  )
}

export default DashboardPage
