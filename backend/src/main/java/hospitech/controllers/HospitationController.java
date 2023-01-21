package hospitech.controllers;

import hospitech.dto.HospitationDTO;
import hospitech.dto.NewHospitationDTO;
import hospitech.entity.Hospitation;
import hospitech.services.HospitationService;
import io.swagger.v3.oas.annotations.Operation;
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
                    \nReturns 400 if any of classes is not conducted by hospitated lecturer""")
    public ResponseEntity<HospitationDTO> addNewHospitation(@RequestBody NewHospitationDTO newHospitationDTO) {
        var hospitation = hospitationService.addNewHospitation(newHospitationDTO);
        return ResponseEntity.ok(hospitation.toDTO());
    }
}
