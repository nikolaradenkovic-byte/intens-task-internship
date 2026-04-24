package com.task.task_backend.controller;

import com.task.task_backend.dto.CandidateDto;
import com.task.task_backend.exception.ResourceNotFoundException;
import com.task.task_backend.service.CandidateService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/candidates")
public class CandidateController {

    private CandidateService candidateService;

    @PostMapping
    public ResponseEntity<CandidateDto> createCandidate(@RequestBody CandidateDto candidateDto) {
        CandidateDto savedCandidate = candidateService.createCandidate(candidateDto);
        return new ResponseEntity<>(savedCandidate, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<CandidateDto> getCandidateById(@PathVariable("id") Long candidateId) {
        CandidateDto candidateDto = candidateService.getCandidateById(candidateId);
        return ResponseEntity.ok(candidateDto);
    }

    @GetMapping("/name/{fullName}")
    public ResponseEntity<List<CandidateDto>> getCandidatesByName(@PathVariable("fullName") String name) {
        List<CandidateDto> candidates = candidateService.getCandidateByName(name);
        return ResponseEntity.ok(candidates);
    }


    @GetMapping()
    public ResponseEntity<List<CandidateDto>> getAllCandidates() {
        List<CandidateDto> candidates = candidateService.getAllCandidates();
        return ResponseEntity.ok(candidates);
    }

    @PostMapping("{skills}")
    public ResponseEntity<List<CandidateDto>> getAllCandidatesBySkills(@PathVariable("skills") List<String> skills) {
        List<CandidateDto> candidates = candidateService.getAllCandidatesBySkills(skills);
        return ResponseEntity.ok(candidates);
    }

    @PutMapping("{id}")
    public ResponseEntity<CandidateDto> updateCandidate(@PathVariable("id") Long candidateId, @RequestBody CandidateDto updatedCandidate) {
        CandidateDto candidateDto = candidateService.updateCandidate(candidateId, updatedCandidate);
        return ResponseEntity.ok(candidateDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCandidate(@PathVariable("id") Long candidateId) {
        candidateService.deleteCandidate(candidateId);
        return ResponseEntity.ok("Candidate deleted successfully!");
    }

}
