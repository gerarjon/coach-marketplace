import { useEffect, useMemo, useState } from 'react';
import './App.css';
import data from './utils/data.json';
import CoachCard from './component/CoachCard';

function App() {
  const [coachList, setCoachList] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState();
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredText, setIsHoveredText] = useState("")


  const specialties = ["general interview", "marketing", "non-native speaker", "presentation", "sales", "software interview", "speech", "technical interview",]

  useEffect(() => {
    setCoachList(data);
  }, []);

  const handleSpecialtyChange = (value) => {
    if (value === "") {
      setSelectedSpecialty(null)
      setCoachList(data)
    }
    setSelectedSpecialty(value);
    setIsCollapsed(!isCollapsed);
    
  }

  const handleSetHover = (value) => {
    setIsHovered(true);
    setIsHoveredText(value)
  }

  const handleRemoveHover = () => {
    setIsHovered(false);
    setIsHoveredText("")
  }

  const handleDropdown = () => {
    setIsCollapsed(!isCollapsed)
  }

  const getFilteredlist = () => {
    if (!selectedSpecialty) {
      return coachList;
    } 

    return coachList.filter((coach) => 
      coach.specialty.some((item) => item === selectedSpecialty)
    )
  }

  const filteredList = useMemo(getFilteredlist, [selectedSpecialty, coachList])

  return (
    <main className='container'>
      <article>
        <div className='select-container'>

          {/* Start Specialty Select */}
          <div className={`dropdown ${isCollapsed ? "" : "is-active"}`} >
            <div className='dropdown-trigger'>
              <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={handleDropdown}>
                <span>{selectedSpecialty ? selectedSpecialty : "Filter By Specialty"}</span>
                <span className="icon is-small">
                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className="dropdown-content" value={selectedSpecialty}>
                <p className='select-option dropdown-item' value="" onClick={() => {handleSpecialtyChange("")}}>All</p>
                {specialties.map((specialty, index) => {
                  return (
                    <p
                      className='select-option dropdown-item' 
                      value={specialty} 
                      key={index}
                      onClick={() => {handleSpecialtyChange(specialty)}}
                      onMouseEnter={() => {handleSetHover(specialty)}}
                      onMouseLeave={handleRemoveHover}
                      >
                        {specialty}
                      </p>
                  )
                })}
              </div>
            </div>
          </div>
          {/* End Specialty Select */}

          {/* Dropdown hover description */}
          {isHovered && (
              <div className='select-hover'>
                {isHoveredText}
                <hr />
                Possible description text for specialty.
              </div>
            )}

          {/* Coach list */}
          <div className='coach-list'>
            {filteredList.map((element, index) => (
              <CoachCard {...element} key={index} />
            ))}
          </div>
        </div>

      </article>
    </main>
  );
}

export default App;
