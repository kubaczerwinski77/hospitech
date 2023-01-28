package hospitech.controllers;

import hospitech.dto.HospitationProtocolDTO;
import hospitech.dto.NewHospitationProtocolDTO;
import hospitech.entity.HospitationProtocol;
import hospitech.services.HospitationProtocolService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/protocols")
@Tag(name = "HospitationProtocols", description = "HospitationProtocols Controller")
public class HospitationProtocolController {

    private HospitationProtocolService protocolService;

    public HospitationProtocolController(HospitationProtocolService protocolService) {
        this.protocolService = protocolService;
    }

    @GetMapping
    @Operation(summary = "Get protocols", description = "Get all protocols")
    public ResponseEntity<List<HospitationProtocolDTO>> getAllProtocols() {
        return ResponseEntity.ok(
                protocolService.getAllProtocols().stream()
                        .map(HospitationProtocol::toDTO)
                        .collect(Collectors.toList())
        );
    }

    @GetMapping("/hospitation/{id}")
    @Operation(summary = "Get protocol for hospitation",
            description = """
                    Get protocol for hospitaiton \n
                    Returns 404 if hospitation not found
                    """
    )
    public ResponseEntity<HospitationProtocolDTO> getHospitationProtocol(@PathVariable("id") final int hospitationId) {
        return ResponseEntity.ok(protocolService.getProtocolForHospitation(hospitationId).toDTO());
    }

    @PostMapping("/hospitation/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Add new protcol for hospitation", description = "Add new protcol for hospitation")
    public ResponseEntity<HospitationProtocolDTO> addProtocol(@Valid @RequestBody final NewHospitationProtocolDTO newProtocol,
                                                              @PathVariable("id") final int hospitationId) {
        final HospitationProtocol protocol = protocolService.saveProtocol(newProtocol, hospitationId);
        return ResponseEntity.status(HttpStatus.CREATED).body(protocol.toDTO());
    }
}
