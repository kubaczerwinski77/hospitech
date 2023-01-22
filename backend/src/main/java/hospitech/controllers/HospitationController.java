package hospitech.controllers;

import hospitech.dto.HospitationDTO;
import hospitech.dto.LecturerWithCoursesDTO;
import hospitech.dto.NewHospitationDTO;
import hospitech.entity.Hospitation;
import hospitech.services.HospitationService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/hospitations")
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
    @Operation(summary = "Add new hospitation",
            description = """
                    Add new hospitation to schedule.
                    \nReturns 404 if any of lecturers don't exist.
                    \nReturns 400 if any of classes is not conducted by hospitated lecturer
                    \nReturns 400 if lecturer or any of the reviewers are the same person""")
    public ResponseEntity<HospitationDTO> addNewHospitation(@Valid @RequestBody NewHospitationDTO newHospitationDTO) {
        var hospitation = hospitationService.addNewHospitation(newHospitationDTO);
        return ResponseEntity.ok(hospitation.toDTO());
    }

    @GetMapping("/reviewers/{reviewerId}/lecturers")
    @Operation(summary = "Get hospitation lecturers for reviewer", description = "Get hospitation lecturers for reviewer")
    public ResponseEntity<List<LecturerWithCoursesDTO>> getHospitationLecturersForReviewer(@PathVariable int reviewerId) {
        return ResponseEntity.ok(hospitationService.getHospitationLecturersForReviewer(reviewerId));
    }
}
