package hospitech.dto;

import hospitech.entity.enums.Degree;
import io.swagger.v3.oas.annotations.media.Schema;

public record LecturerDTO(
        @Schema(description = "lecturer id", example = "123")
        int lecturerId,
        @Schema(description = "lecturer first name", example = "Adam")
        String firstName,
        @Schema(description = "lecturer last name", example = "Malysz")
        String lastName,
        @Schema(description = "lecturer degree", example = "DR")
        Degree degree,
        @Schema(description = "lecturer department", example = "Katedra Informatyki Stosowanej")
        String department,
        @Schema(description = "is lecturer in wzhz", example = "true")
        boolean isInWZHZ
) {
}
