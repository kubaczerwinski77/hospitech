package hospitech.dto;

import hospitech.entity.enums.CourseType;

public record CourseDTO(
        int courseId,
        String name,
        String code,
        CourseType courseType
) {
}
