package hospitech.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record NewHospitationDTO(
        @Schema(description = "List of class ids")
        @NotEmpty(message = "List of classes cannot be empty")
        List<Integer> classIds,
        @Schema(description = "Id of hospitated lecturer", example = "123")
        @NotNull(message = "Id of hospitated lecturer cannot be null")
        int hospitatedLecturer,
        @Schema(description = "Id of wzhz reviewer", example = "1234")
        @NotNull(message = "Id of wzhz reviewer cannot be null")
        int wzhzReviewer,
        @Schema(description = "Id of second reviewer", example = "12345")
        @NotNull(message = "Id of second reviewer cannot be null")
        int secondReviewer
) {
}
