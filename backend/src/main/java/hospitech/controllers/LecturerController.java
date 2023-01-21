package hospitech.controllers;

import hospitech.dto.LecturerDTO;
import hospitech.dto.UniversityClassDTO;
import hospitech.entity.Lecturer;
import hospitech.entity.UniversityClass;
import hospitech.services.LecturerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/lecturers")
public class LecturerController {
    private final LecturerService lecturerService;

    public LecturerController(LecturerService lecturerService) {
        this.lecturerService = lecturerService;
    }

    @GetMapping("/wzhz")
    public ResponseEntity<List<LecturerDTO>> getLecturersInWZHZ() {
        return ResponseEntity.ok(
                lecturerService.getLecturersInWZHZ()
                        .stream()
                        .map(Lecturer::toDTO)
                        .toList());
    }

    @GetMapping("/{lecturerId}/classes")
    public ResponseEntity<List<UniversityClassDTO>> getLecturersClasses(@PathVariable int lecturerId, @RequestParam("semester") String semester) {
        return ResponseEntity.ok(
                lecturerService.getLecturersClasses(lecturerId, semester)
                        .stream()
                        .map(UniversityClass::toDTO)
                        .toList());
    }
}
