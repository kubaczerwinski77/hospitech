package hospitech.controllers;

import hospitech.dto.LecturerDTO;
import hospitech.dto.UniversityClassDTO;
import hospitech.entity.Lecturer;
import hospitech.entity.UniversityClass;
import hospitech.services.LecturerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/lecturers")
@Tag(name = "Lecturers", description = "Lecturer Controller")
public class LecturerController {
    private final LecturerService lecturerService;

    public LecturerController(LecturerService lecturerService) {
        this.lecturerService = lecturerService;
    }

    @GetMapping
    @Operation(summary = "Get lecturers", description = "Get all lecturers or only the ones in WZHZ")
    public ResponseEntity<List<LecturerDTO>> getLecturersInWZHZ(
            @Parameter(description = "are lecturers in wzhz", example = "false")
            @RequestParam(value = "wzhz", defaultValue = "false", required = false) boolean isInWZHZ) {
        return ResponseEntity.ok(
                lecturerService.getLecturers(isInWZHZ)
                        .stream()
                        .map(Lecturer::toDTO)
                        .toList());
    }

    @GetMapping("/{lecturerId}/classes")
    @Operation(summary = "Get lecturer's classes",
            description = """
                    Get lecturer's classes from given semester.
                    \nReturns empty list if given lecturer has no classes in given semester
                    \nReturns 404 if lecturer with given id doesn't exist""")
    public ResponseEntity<List<UniversityClassDTO>> getLecturersClasses(
            @Parameter(description = "lecturer's id", example = "1")
            @PathVariable int lecturerId,
            @Parameter(description = "study semester", example = "zimowy 2022/2023")
            @RequestParam("semester") String semester) {
        return ResponseEntity.ok(
                lecturerService.getLecturersClasses(lecturerId, semester)
                        .stream()
                        .map(UniversityClass::toDTO)
                        .toList());
    }
}
