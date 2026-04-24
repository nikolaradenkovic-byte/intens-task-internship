package com.task.task_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CandidateDto {
    private Long id;
    private String fullName;
    private String email;
    private String contactNumber;
    private String dateOfBirth;
    private List<String> skills;
}
