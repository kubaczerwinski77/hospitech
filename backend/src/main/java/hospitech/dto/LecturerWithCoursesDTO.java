package hospitech.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

public record LecturerWithCoursesDTO(
        @Schema(description = "Lecturer")
        LecturerDTO lecturer,
        @Schema(description = "Course")
        List<CourseDTO> courses
) {
}
