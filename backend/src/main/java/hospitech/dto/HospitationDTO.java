package hospitech.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

public record HospitationDTO(
        @Schema(description = "hospitation id", example = "123")
        int hospitationId,
        @Schema(description = "Hospitated lecturer")
        LecturerDTO hospitatedLecturer,
        @Schema(description = "Reviewer from WZHZ")
        LecturerDTO wzhzReviewer,
        @Schema(description = "Second reviewer")
        LecturerDTO secondReviewer,
        @Schema(description = "Hospitated university class")
        List<UniversityClassDTO> classesForHospitation
) {
}
