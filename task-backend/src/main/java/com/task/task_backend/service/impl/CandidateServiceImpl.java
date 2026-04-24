package com.task.task_backend.service.impl;

import com.task.task_backend.dto.CandidateDto;
import com.task.task_backend.entity.Candidate;
import com.task.task_backend.exception.ResourceNotFoundException;
import com.task.task_backend.mapper.CandidateMapper;
import com.task.task_backend.repository.CandidateRepository;
import com.task.task_backend.service.CandidateService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CandidateServiceImpl implements CandidateService {

    private CandidateRepository candidateRepository;

    @Override
    public CandidateDto createCandidate(CandidateDto candidateDto) {

        Candidate candidate = CandidateMapper.mapToCandidate(candidateDto);
        Candidate savedCandidate = candidateRepository.save(candidate);
        return CandidateMapper.mapToCandidateDto(savedCandidate);
    }

    @Override
    public CandidateDto getCandidateById(Long candidateId) {
        Candidate candidate = candidateRepository.findById(candidateId)
            .orElseThrow(() ->
                    new ResourceNotFoundException("Candidate is not exists with given id: " + candidateId));
        return CandidateMapper.mapToCandidateDto(candidate);
    }

    @Override
    public List<CandidateDto> getCandidateByName(String name) {
        List<Candidate> candidates = candidateRepository.findAll();
        return candidates.stream().filter(candidate -> candidate.getFullName().toLowerCase().contains(name.toLowerCase()))
                .map(CandidateMapper::mapToCandidateDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CandidateDto> getAllCandidatesBySkills(List<String> skills) {
        List<Candidate> candidates = candidateRepository.findAll();
        return candidates.stream().filter(candidate -> candidate.getSkills().containsAll(skills))
                .map(CandidateMapper::mapToCandidateDto)
                .collect(Collectors.toList());
    }



    @Override
    public List<CandidateDto> getAllCandidates() {
        List<Candidate> candidates = candidateRepository.findAll();
        return candidates.stream().map(CandidateMapper::mapToCandidateDto)
                .collect(Collectors.toList());
    }

    @Override
    public CandidateDto updateCandidate(Long candidateId, CandidateDto updatedCandidate) {
        Candidate candidate = candidateRepository.findById(candidateId).orElseThrow(
                () -> new ResourceNotFoundException("Candidate is not exists with given id: " + candidateId)
        );

        candidate.setFullName(updatedCandidate.getFullName());
        candidate.setEmail(updatedCandidate.getEmail());
        candidate.setContactNumber(updatedCandidate.getContactNumber());
        candidate.setDateOfBirth(updatedCandidate.getDateOfBirth());
        candidate.setSkills(updatedCandidate.getSkills());
        Candidate updatedCandidateObj = candidateRepository.save(candidate);
        return CandidateMapper.mapToCandidateDto(updatedCandidateObj);
    }

    @Override
    public void deleteCandidate(Long candidateId) {
        Candidate candidate = candidateRepository.findById(candidateId).orElseThrow(
                () -> new ResourceNotFoundException("Candidate is not exists with given id: " + candidateId)
        );
        candidateRepository.deleteById(candidateId);
    }
}
