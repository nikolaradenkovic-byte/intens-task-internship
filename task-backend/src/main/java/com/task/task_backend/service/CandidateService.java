package com.task.task_backend.service;

import com.task.task_backend.dto.CandidateDto;

import java.util.List;

public interface CandidateService {
    CandidateDto createCandidate(CandidateDto candidateDto);

    CandidateDto getCandidateById(Long candidateId);

    List<CandidateDto> getCandidateByName(String name);

    List<CandidateDto> getAllCandidatesBySkills(List<String> skills);

    List<CandidateDto> getAllCandidates();

    CandidateDto updateCandidate(Long candidateId, CandidateDto updatedCandidate);

    void deleteCandidate(Long candidateId);
}
