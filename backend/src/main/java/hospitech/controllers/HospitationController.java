package hospitech.controllers;

import hospitech.entity.Hospitation;
import hospitech.services.HospitationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/hospitations")
public class HospitationController {
    private final HospitationService hospitationService;

    public HospitationController(HospitationService hospitationService) {
        this.hospitationService = hospitationService;
    }

    @GetMapping
    public ResponseEntity<List<Hospitation>> getHospitations() {
        return ResponseEntity.ok(List.of());
    }

    @GetMapping("{hospitationId}")
    public ResponseEntity<Hospitation> getHospitation(@PathVariable int hospitationId) {
        return ResponseEntity.ok(null);
    }
}
