// import Separator from "./common/Separator";
import axios from "axios";
import getEnvironment from "../getenvironment";
import { useState, useEffect } from "react";
// import formatDate from "../utility/formatDate"
import "./Timeline.css"

export default function Timeline(props) {
  const confid = props.confid;
  const [datesData, setDatesData] = useState([]);
  // const apiUrl = getEnvironment();
  const [apiUrl, setApiUrl] = useState(null);

    useEffect(() => {
        // Fetch the environment URL
        getEnvironment().then(url => setApiUrl(url));
    }, []);
    useEffect(() => {
      if (apiUrl) {

    window.scrollTo(0, 0);

  axios.get(`${apiUrl}/conferencemodule/eventDates/conference/${confid}`, {
    withCredentials: true
  })
    .then(res => {
      // console.log('timeline -> ',res.data);
      setDatesData(res.data.sort((a ,b)=> a.order - b.order).filter(d=>d.featured))

    })
    .catch(err => console.log(err))
  }
}, [apiUrl, confid]);
  // useEffect(() => {
  //   axios.get(`${apiUrl}/conferencemodule/eventDates/conference/${confid}`, {
  //     withCredentials: true

  //   })
  //     .then(res => {
  //       // setDatesData(res.data);
  //       console.log('dates ->',res.data);

  //     })
  //     .catch(err => console.log(err))

  // }, []);

  function showDate(d) {
    let dt = new Date(d.extended ? d.newDate : d.date)
    return dt.toLocaleDateString('en-US',{ year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (<>
    <div className="text-center w-full">
          <h2 className="text-4xl text-accent-50 font-bold  mb-4 bg-accent-800 w-full mt-28 py-2">Important Dates</h2>

          <h3 className="text-xl font-medium leading-relaxed text-gray-800 lg:w-2/3 mx-auto">

          </h3>
        </div>
    <div className="container w-full flex items-center justify-evenly mx-auto py-16 lg:py-16">
      
      <div className="w-full items-center flex justify-evenly">

        
        {/* <div className="relative py-5">
          <div
            className="w-10 md:w-12 absolute top-0 left-0 bottom-0 flex flex-col justify-center lg:left-1/2 lg:-ml-6"
            aria-hidden="true"
          >
            <div className="mx-auto w-1 h-2.5 grow-0 bg-gradient-to-b from-transparent to-accent-100 rounded-t" />
            <div className="mx-auto w-1 grow bg-accent-100" />
            <div className="mx-auto w-1 h-2.5 grow-0 bg-gradient-to-t from-transparent to-accent-100 rounded-b" />
          </div>

          <ul className="relative space-y-4 pl-10 md:pl-12 lg:pl-0">
            {datesData.map((item, index) => (
              index % 2 === 0 ? (

                <li key={index} className="relative lg:w-1/2 lg:pr-6 lg:mr-auto">
                  <div className="w-10 md:w-12 absolute top-0 left-0 bottom-0 -translate-x-full flex justify-center mt-5 lg:translate-x-6 lg:left-auto lg:right-0">
                    <div className="w-3 h-3 bg-accent-500 rounded-full ring ring-accent-100 ring-opacity-100 ring-offset-2" />
                  </div>
                  <div className="bg-gray-100 hover:ring hover:ring-gray-100 hover:ring-offset-2 rounded-xl p-4">
                    <h4 className="font-semibold mb-2">{item.title}{" "}
                    </h4>
                    <p className="text-sm leading-relaxed">
                      <a
                        href="#"
                        className="font-medium text-accent-600 hover:text-accent-400"
                      >
                      </a>
                    </p>
                  </div>
                  <div className="px-4 py-2 lg:w-40 lg:absolute lg:top-0 lg:right-0 lg:bottom-0 lg:translate-x-full lg:flex lg:flex-col lg:mt-4 lg:py-0 lg:pr-0 lg:pl-6">
                    <p className="font-medium text-sm text-gray-500">
                      {formatDate(item.date)}                </p>
                  </div>
                </li>

              ) : (

                <li key={index} className="relative lg:w-1/2 lg:pl-6 lg:ml-auto">
                  <div className="w-10 md:w-12 absolute top-0 left-0 bottom-0 -translate-x-full flex justify-center mt-5 lg:-translate-x-6">
                    <div className="w-3 h-3 bg-accent-500 rounded-full ring ring-accent-100 ring-opacity-100 ring-offset-2" />
                  </div>
                  <div className="bg-gray-100 hover:ring hover:ring-gray-100 hover:ring-offset-2 rounded-xl p-4">
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                  </div>
                  <div className="px-4 py-2 lg:w-40 lg:absolute lg:top-0 lg:left-0 lg:bottom-0 lg:-translate-x-full lg:flex lg:flex-col lg:text-right lg:mt-4 lg:py-0 lg:pl-0 lg:pr-6">
                    <p className="font-medium text-sm text-gray-500">
                      {formatDate(item.date)}                </p>
                  </div>
                </li>
              )

            ))}
          </ul>
        </div> */}

<ol className="w-[70vw] sm:flex ">
      {/* <ListItem
        version="Febraury 15, 2025"
        date=""
        description="● Paper Submission Deadline "
      />
      <ListItem
        version="March 30, 2025"
        date=""
        description="●	Notification for the Acceptance  "
      />
      <ListItem
        version="April 10, 2025"
        date=""
        description="●Submission of Final Paper "
      />
      <ListItem
        version="May 10, 2025"
        date=""
        description="●	Registration Deadline " 

      />  */}
      {
        datesData && (datesData.slice(0,-1).map((d,k)=>(
          <ListItem 
          key={k} 
          version={showDate(d)} 
          date={''} 
          description={d.title} />
        ))
      )
      }
      {datesData && datesData.length>1 && <ListItem version={showDate(datesData.slice(-1)[0])} date='' description={datesData.slice(-1)[0].title} last />}
    </ol>


      </div>

      {/* <div classNameName="w-full md:w-[700px] lg:w-2/5 px-4 lg:px-0   mt-10 lg:mt-0 mx-auto lg:pl-5 lg:mx-0 ">
        <h2 classNameName="text-4xl font-sans font-bold text-gray-950 mb-3 lg:mb-4">About Doaba Regional Centre (DRC)
        </h2>
        <Separator />
        <p className="text-base text-justify font-sans font-base text-gray-800">
          The Indian Institute of Chemical Engineers (IIChE) is the apex
          professional body of Chemical Engineers in the country instituted
          in the year 1947 and presently has more than 25,000 corporate
          members on its roll. The activities of the Institute are spread
          across the country through its 47 Regional Centres and 186
          Student Chapters, apart from the HQ located at the Jadavpur
          University Campus, Kolkata
          The IIChE has been conducting the Associate Membership
          Examination since 1960 and publishes an esteemed quarterly
          Journal “The Indian Chemical Engineer” since 1959..
        </p>
      </div> */}
    </div>
    </>
  );
}

const ListItem = ({ version, date, description, last}) => {
  const [hover, setHover] = useState(false)
  return (
    <li 
      onMouseEnter={()=>{if(!hover)setHover(true)}} 
      onMouseLeave={()=>{if(hover)setHover(false)}}
      className={`relative mb-6 sm:mb-0 cursor-pointer ${hover&&' bg-red-glow rounded-lg '}`}>
      <div className="flex items-center">
        <div 
        className={"z-10 flex items-center justify-center w-6 h-6 bg-accent-100 rounded-full ring-0 ring-white dark:bg-accent-900 sm:ring-8 dark:ring-gray-900 shrink-0 "+
          `${hover&&" animate-hover-bounce"}`
        }>
          <svg className="w-2.5 h-2.5 text-accent-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
          </svg>
        </div>
        {!last&&<div className="hidden sm:flex w-full bg-accent-200 h-0.5 dark:bg-gray-700"></div>}
      </div>
      <div className={`mt-3 sm:pe-7 ${ hover && ' transform duration-500 transition scale-110' }`}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white whitespace-nowrap">{version}</h3>
        <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"> {date}</time>
        <p className="text-base font-normal text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </li>
    
  );
};
