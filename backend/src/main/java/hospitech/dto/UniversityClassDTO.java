package hospitech.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import hospitech.entity.enums.DayOfTheWeek;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalTime;

public record UniversityClassDTO(
        @Schema(description = "class id", example = "123")
        int classId,
        @Schema(description = "building in which classes are held", example = "D-1")
        String building,
        @Schema(description = "room in which classes are held", example = "333b")
        String room,
        @Schema(description = "course code", example = "MAZ001100C")
        String course,
        @JsonFormat(pattern = "HH:mm")
        @Schema(description = "starting time of class", example = "13:15")
        LocalTime startTime,
        @JsonFormat(pattern = "HH:mm")
        @Schema(description = "end time of class", example = "15:00")
        LocalTime endTime,
        @Schema(description = "day of the week of class", example = "MONDAY")
        DayOfTheWeek dayOfTheWeek,
        @Schema(description = "class semester", example = "zimowy 2022/2023")
        String semester
) {
}
