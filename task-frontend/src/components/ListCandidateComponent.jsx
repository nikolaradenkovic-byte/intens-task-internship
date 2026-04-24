import React, {useEffect, useState} from 'react'
import { deleteCandidate, listCandidates } from '../services/CandidateService'
import { useNavigate } from 'react-router-dom'

const ListCandidateComponent = () => {

    const [candidates, setCandidates] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        getAllCandidates();
    }, [])

    function getAllCandidates() {
        listCandidates().then((response) => {
            setCandidates(response.data);
        }).catch(error =>{
            console.error(error);
        })
    }
    function addNewCandidate() {
        navigator('/add-candidate');
    }

    function updateCandidate(id) {
        navigator(`/update-candidate/${id}`)
    }

    function removeCandidate(id) {
        console.log(id);

        deleteCandidate(id).then((response) => {
            getAllCandidates();
        }).catch(error =>{
            console.error(error);
        })
    }

    function search() {
        navigator("/search")
    }

    function searchName() {
        navigator("/search-name")
    }

  return (
    <div className="container">
        <h2 className="text-center">List of Candidates</h2>
        <button className="btn btn-dark mb-2" onClick={addNewCandidate}>Add Candidate</button>
        <button className="btn btn-dark mb-2 ms-2" onClick={search}>Search By Skills</button>
        <button className="btn btn-dark mb-2 ms-2" onClick={searchName}>Search by Name</button>
        <table className="table table-dark table-striped table-bordered">
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
        </table>
    </div>
  )
}

export default ListCandidateComponent