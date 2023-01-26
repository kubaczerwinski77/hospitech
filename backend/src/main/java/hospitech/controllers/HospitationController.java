package hospitech.controllers;

import hospitech.dto.HospitationDTO;
import hospitech.dto.LecturerWithCoursesDTO;
import hospitech.dto.NewHospitationDTO;
import hospitech.entity.Hospitation;
import hospitech.services.HospitationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/hospitations")
@Tag(name = "Hospitations", description = "Hospitation Controller")
public class HospitationController {
    private final HospitationService hospitationService;

    public HospitationController(HospitationService hospitationService) {
        this.hospitationService = hospitationService;
    }

    @GetMapping
    @Operation(summary = "Get hospitations", description = "Get all hospitations")
    public ResponseEntity<List<HospitationDTO>> getHospitations() {
        return ResponseEntity.ok(
                hospitationService.getHospitations()
                        .stream()
                        .map(Hospitation::toDTO)
                        .toList());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Add new hospitation",
            description = """
                    Add new hospitation to schedule
                    \nReturns 404 if any of lecturers doesn't exist
                    \nReturns 400 if any of classes is not conducted by hospitated lecturer
                    \nReturns 400 if wzhz reviewer is not from wzhz
                    \nReturns 400 if lecturer or any of the reviewers are the same person""")
    public ResponseEntity<HospitationDTO> addNewHospitation(@Valid @RequestBody NewHospitationDTO newHospitationDTO) {
        var hospitation = hospitationService.addNewHospitation(newHospitationDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(hospitation.toDTO());
    }

    @GetMapping("/reviewers/{reviewerId}/lecturers")
    @Operation(summary = "Get hospitation lecturers for reviewer",
            description = """
                    Get hospitation lecturers for reviewer
                    \nReturns empty list if reviewer has no hospitations
                    """)
    public ResponseEntity<List<LecturerWithCoursesDTO>> getHospitationLecturersForReviewer(
            @Parameter(description = "hospitation reviewer's id", example = "1")
            @PathVariable int reviewerId) {
        return ResponseEntity.ok(
                hospitationService.getHospitationLecturersForReviewer(reviewerId)
                        .stream()
                        .map(this::getHospitatedLecturerWithCoursesDTO)
                        .toList());
    }

    private LecturerWithCoursesDTO getHospitatedLecturerWithCoursesDTO(Hospitation hospitation) {
        return new LecturerWithCoursesDTO(hospitation.getHospitatedLecturer().toDTO(),
                hospitation.getClassesForHospitation()
                        .stream()
                        .map(uniClass -> uniClass.getCourse().toDTO())
                        .toList());
    }
}
