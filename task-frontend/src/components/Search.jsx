import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteCandidate, searchCandidateSkill } from '../services/CandidateService';

function Search() {
    const [candidates, setCandidates] = useState([])

    const [skills, setSkills] = useState([])

    const [errors, setErrors] = useState({
        skills: ''
    })
    
    const navigator = useNavigate();

    function getAllCandidatesBySkill(skills) {
        if(validateForm()) {
            searchCandidateSkill(skills).then((response) => {
                setCandidates(response.data);
            })
            .catch(error => {
                console.error(error);
            })
        }
    }

    function updateCandidate(id) {
        navigator(`/update-candidate/${id}`)
    }

    function removeCandidate(id) {
        console.log(id);

        deleteCandidate(id).then((response) => {
            getAllCandidatesBySkill(skills);
        }).catch(error =>{
            console.error(error);
        })
    }

    function validateForm() {
            let valid = true;
            
            const errorsCopy = {... errors};

            if(skills.length > 0) {
                errorsCopy.skills = '';
            } else {
                errorsCopy.skills = 'Skills are required.';
                valid = false;
            }

            setErrors(errorsCopy);

            return valid;
        }

  return (
    <div className='container'>
        <br /><br />
        <h2 className="text-center">Search</h2>
        <br /><br />
        {
            candidates.length > 0 && (<table className="table table-dark table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Candidate Id</th>
                        <th>Candidate Full Name</th>
                        <th>Candidate Email</th>
                        <th>Candidate Contact Number</th>
                        <th>Candidate Date Of Birth</th>
                        <th>Candidate Skills</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        candidates.map(candidate => 
                            <tr key={candidate.id}>
                                <td>{candidate.id}</td>
                                <td>{candidate.fullName}</td>
                                <td>{candidate.email}</td>
                                <td>{candidate.contactNumber}</td>
                                <td>{candidate.dateOfBirth}</td>
                                <td>
                                {
                                    candidate.skills.map((skill, i) =>
                                        i !== candidate.skills.length - 1 ? `${skill}, ` : skill
                                    )
                                }
                                </td>
                                <td>
                                <button className="btn btn-warning" onClick={() => updateCandidate(candidate.id)}>Update</button>
                                <button className="btn btn-danger" onClick={() => removeCandidate(candidate.id)}
                                    style={{marginTop: "10px"}}
                                    >Delete</button>
                                </td>
                                </tr>
                        )
                    }
                </tbody>
            </table>)
        }
        <br /> <br />
        <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
                <div className="card-body">
                    <form>
                        <div className="form-group mb-2">
                            <label className="form-label">Skills:</label>
                            <select 
                            multiple
                            className={`form-select ${ errors.skills ? 'is-invalid' : '' } `}
                            value={skills}
                            onChange={(e) =>{
                                setSkills([...e.target.selectedOptions].map(option => option.value))
                            }}
                            >
                                <option value="Java programming">Java programming</option>
                                <option value="C# programming">C# programming</option>
                                <option value="Database design">Database design</option>
                                <option value="English">English</option>
                                <option value="Russian">Russian</option>
                                <option value="German">German</option>
                            </select>
                            { errors.skills && <div className='invalid-feedback'>{ errors.skills }</div> }
                        </div>
                        <button type="button" className="btn btn-success" onClick={() => getAllCandidatesBySkill(skills)}>Submit</button>      
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Search;