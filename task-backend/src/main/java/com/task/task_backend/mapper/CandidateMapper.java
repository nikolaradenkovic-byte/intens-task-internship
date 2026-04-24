package com.task.task_backend.mapper;

import com.task.task_backend.dto.CandidateDto;
import com.task.task_backend.entity.Candidate;

public class CandidateMapper {

    public static CandidateDto mapToCandidateDto(Candidate candidate){
        return new CandidateDto(
          candidate.getId(),
          candidate.getFullName(),
          candidate.getEmail(),
          candidate.getContactNumber(),
          candidate.getDateOfBirth(),
          candidate.getSkills()
        );
    }

    public static Candidate mapToCandidate(CandidateDto candidateDto) {
        return new Candidate(
                candidateDto.getId(),
                candidateDto.getFullName(),
                candidateDto.getEmail(),
                candidateDto.getContactNumber(),
                candidateDto.getDateOfBirth(),
                candidateDto.getSkills()
        );
    }
}
