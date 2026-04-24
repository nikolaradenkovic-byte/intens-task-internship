import React, { useState } from 'react'
import { deleteCandidate, getCandidateByName } from '../services/CandidateService'
import { useNavigate } from 'react-router-dom'

const SearchName = () => {

      const [candidates, setCandidates] = useState([])
  
      const [fullName, setFullName] = useState("")
  
      const [errors, setErrors] = useState({
          fullName: ''
      })

      const navigator = useNavigate();

      function updateCandidate(id) {
          navigator(`/update-candidate/${id}`)
      }
      
      function getAllCandidatesByName(name) {
        if(validateForm()) {
          getCandidateByName(name).then((response) => {
            setCandidates(response.data);
          })
          .catch(error => {
            console.error(error);
          })
        }
      }
  
      function removeCandidate(id) {
          console.log(id);
  
          deleteCandidate(id).then((response) => {
              getAllCandidatesByName(fullName);
          }).catch(error =>{
              console.error(error);
          })
      }
  
      function validateForm() {
              let valid = true;
              
              const errorsCopy = {... errors};
  
              if(fullName.trim()) {
                  errorsCopy.fullName = '';
              } else {
                  errorsCopy.fullName = 'Full name is required.';
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
                            <label className="form-label">Full Name:</label>
                            <input 
                                type="text"
                                placeholder="Enter Candidate Full Name"
                                name="fullName"
                                value={fullName}
                                className={`form-control ${ errors.fullName ? 'is-invalid' : '' } `}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            { errors.fullName && <div className='invalid-feedback'>{ errors.fullName }</div>}
                        </div>
                        <button type="button" className="btn btn-success" onClick={() => getAllCandidatesByName(fullName)}>Submit</button>      
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchName