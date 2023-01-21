package hospitech.dto;

import java.util.List;

public record NewHospitationDTO(
        List<Integer> classIds,
        int hospitatedLecturer,
        int wzhzReviewer,
        int secondReviewer
) {
}
