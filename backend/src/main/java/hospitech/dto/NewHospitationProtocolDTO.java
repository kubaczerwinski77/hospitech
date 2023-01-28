package hospitech.dto;

import hospitech.entity.HospitationProtocolQuestions;
import hospitech.entity.enums.Grade;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

public record NewHospitationProtocolDTO(

        @Schema(description = "Questions from protocol")
        @NotNull(message = "Protocol questions cannot be null")
        HospitationProtocolQuestions questions,
        @Schema(description = "Environment", example = "stacjonarne")
        String environment,
        @Schema(description = "Grade", example = "DOBRA")
        @NotNull(message = "Grade cannot be null")
        Grade grade,
        @Schema(description = "Explanation for given grade")
        @NotNull(message = "Grade explanation cannot be null")
        String gradeExplanation,
        @Schema(description = "Comments and recommendations to hospitated lecturer")
        String commentsAndRecommendations
) {
}
