import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/candidates";

export const listCandidates = () => axios.get(REST_API_BASE_URL);

export const createCandidate = (candidate) => axios.post(REST_API_BASE_URL, candidate);

export const getCandidate = (candidateId) => axios.get(REST_API_BASE_URL + '/' + candidateId);

export const updateCandidate = (candidateId, candidate) => axios.put(REST_API_BASE_URL + "/" + candidateId, candidate);

export const deleteCandidate = (candidateId) => axios.delete(REST_API_BASE_URL + "/" + candidateId);

export const searchCandidateSkill = (skills) => axios.post(REST_API_BASE_URL + "/" + skills.map(encodeURIComponent).join(","));

export const getCandidateByName = (fullName) => axios.get(REST_API_BASE_URL + "/name/" + fullName);