package hospitech.dto;

import hospitech.entity.HospitationProtocolQuestions;
import hospitech.entity.enums.Grade;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

public record HospitationProtocolDTO(

        @Schema(description = "Protocol id")
        int protocolId,
        @Schema(description = "Questions from protocol")
        HospitationProtocolQuestions questions,
        @Schema(description = "Environment", example = "stacjonarne")
        String environment,
        @Schema(description = "Grade", example = "DOBRA")
        Grade grade,
        @Schema(description = "Explanation for given grade")
        String gradeExplanation,
        @Schema(description = "Comments and recommendations to hospitated lecturer")
        String commentsAndRecommendations,
        @Schema(description = "Is protocol signed")
        boolean signed,
        @Schema(description = "Date of protocol signing")
        LocalDateTime signatureDate,
        @Schema(description = "Date of protocol creation")
        LocalDateTime protocolCreationDate
) {
}
