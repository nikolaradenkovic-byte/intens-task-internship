import React, { useEffect, useState } from 'react'
import { createCandidate, getCandidate, updateCandidate } from '../services/CandidateService'
import { useNavigate, useParams } from 'react-router-dom'

const CandidateComponent = () => {
  
    const [fullName, setFullName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [email, setEmail] = useState('')
    const [skills, setSkills] = useState([])

    let {id} = useParams();

    const [errors, setErrors] = useState({
        fullName: '',
        dateOfBirth: '',
        contactNumber: '',
        skills: '',
        email: ''
    })

    const navigator = useNavigate();

    useEffect(() => {

        if(id) {
            getCandidate(id).then((response) => {
                setFullName(response.data.fullName);
                setDateOfBirth(response.data.dateOfBirth);
                setContactNumber(response.data.contactNumber);
                setSkills(response.data.skills);
                setEmail(response.data.email);
            }).catch(error => {
                console.error(error);
            })
        }

    }, [id])

    function saveOrUpdateCandidate(e) {
        e.preventDefault();

        if(validateForm()) {
            const candidate = {fullName, dateOfBirth, contactNumber, skills, email};
            console.log(candidate);

            if(id) {
                updateCandidate(id, candidate).then((response) => {
                    console.log(response.data);
                    navigator('/candidates');
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createCandidate(candidate).then((response) => {
                    console.log(response.data);
                    navigator('/candidates');
                }).catch(error => {
                    console.error(error);
                }); 
            }

        }

    }

        function validateForm() {
            let valid = true;
            
            const errorsCopy = {... errors};

            if(fullName.trim()) {
                errorsCopy.fullName = '';
            } else {
                errorsCopy.fullName = 'Full name is required';
                valid = false;
            }

            if(dateOfBirth.trim()) {
                errorsCopy.dateOfBirth = '';
            } else {
                errorsCopy.dateOfBirth = 'Date of birth is required.';
                valid = false;
            }

            if(email.trim()) {
                errorsCopy.email = '';
            } else {
                errorsCopy.email = 'Email is required';
                valid = false;
            }

            if(contactNumber.trim()) {
                errorsCopy.contactNumber = '';
            } else {
                errorsCopy.contactNumber = 'Contact number is required.';
                valid = false;
            }

            if(skills.length > 0) {
                errorsCopy.skills = '';
            } else {
                errorsCopy.skills = 'Skills are required.';
                valid = false;
            }

            setErrors(errorsCopy);

            return valid;
        }

        function pageTitle() {
            if(id) {
                return <h2 className="text-center">Update Candidate</h2>
            } else {
                return <h2 className="text-center">Add Candidate</h2>
            }
        }

    return (
    <div className="container">
        <br /><br />
        <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
                { pageTitle() }
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
                        <div className="form-group mb-2">
                            <label className="form-label">Candidate Date Of Birth:</label>
                            <input 
                                type="text"
                                placeholder="Enter Candidate Date Of Birth"
                                name="dateOfBirth"
                                value={dateOfBirth}
                                className={`form-control ${ errors.dateOfBirth ? 'is-invalid' : '' } `}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                            />
                            { errors.dateOfBirth && <div className='invalid-feedback'>{ errors.dateOfBirth }</div>}
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Email:</label>
                            <input 
                                type="text"
                                placeholder="Enter Candidate Email"
                                name="email"
                                value={email}
                                className={`form-control ${ errors.email ? 'is-invalid' : '' } `}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            { errors.email && <div className='invalid-feedback'>{ errors.email }</div>}
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Contact Number:</label>
                            <input 
                                type="text"
                                placeholder="Enter Candidate Contact Number"
                                name="contactNumber"
                                value={contactNumber}
                                className={`form-control ${ errors.contactNumber ? 'is-invalid' : '' } `}
                                onChange={(e) => setContactNumber(e.target.value)}
                            />
                            { errors.contactNumber && <div className='invalid-feedback'>{ errors.contactNumber }</div>}
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Skills:</label>
                            <select 
                            multiple
                            className={`form-select ${ errors.skills ? 'is-invalid' : '' } `}
                            value={skills}
                            onChange={(e) =>
                                setSkills([...e.target.selectedOptions].map(option => option.value))
                            }
                            
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
                        <button className="btn btn-success" onClick={saveOrUpdateCandidate}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CandidateComponent