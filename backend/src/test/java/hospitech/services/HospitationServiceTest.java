package hospitech.services;

import hospitech.dto.NewHospitationDTO;
import hospitech.entity.Hospitation;
import hospitech.entity.Lecturer;
import hospitech.entity.UniversityClass;
import hospitech.entity.enums.Degree;
import hospitech.repository.HospitationRepository;
import org.assertj.core.api.SoftAssertions;
import org.assertj.core.api.junit.jupiter.SoftAssertionsExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith({MockitoExtension.class, SoftAssertionsExtension.class})
class HospitationServiceTest {
    @Mock
    private LecturerService lecturerService;
    @Mock
    private HospitationRepository hospitationRepository;

    @Mock
    private UniversityClassService universityClassService;
    private HospitationService hospitationService;
    private Lecturer hospitatedLecturer;
    private Lecturer wzhzReviewer;
    private Lecturer secondReviewer;
    private NewHospitationDTO newHospitationDTO;
    private Hospitation hospitation = new Hospitation();

    @BeforeEach
    void setUp() {
        hospitationService = new HospitationService(hospitationRepository, lecturerService, universityClassService);
        hospitatedLecturer = createTestLecturer(1, false);
        wzhzReviewer = createTestLecturer(2, true);
        secondReviewer = createTestLecturer(3, false);

        hospitation.setHospitatedLecturer(hospitatedLecturer);
        hospitation.setWzhzReviewer(wzhzReviewer);
        hospitation.setSecondReviewer(secondReviewer);

        var uniClass = new UniversityClass();
        uniClass.setClassId(1);
        hospitation.setClassesForHospitation(List.of(uniClass));

        hospitatedLecturer.setClasses(List.of(uniClass));
        newHospitationDTO = new NewHospitationDTO(hospitatedLecturer.getClasses().stream().map(UniversityClass::getClassId).toList(),
                hospitatedLecturer.getLecturerId(), wzhzReviewer.getLecturerId(), secondReviewer.getLecturerId());

        Mockito.lenient().when(lecturerService.getLecturerByIdOrThrowException(hospitatedLecturer.getLecturerId())).thenReturn(hospitatedLecturer);
        Mockito.lenient().when(hospitationRepository.existsByHospitatedLecturer_LecturerId(hospitatedLecturer.getLecturerId())).thenReturn(false);
        Mockito.lenient().when(lecturerService.getLecturerByIdOrThrowException(wzhzReviewer.getLecturerId())).thenReturn(wzhzReviewer);
        Mockito.lenient().when(lecturerService.getLecturerByIdOrThrowException(secondReviewer.getLecturerId())).thenReturn(secondReviewer);
        Mockito.lenient().when(universityClassService.getUniversityClassByIdOrThrowException(uniClass.getClassId())).thenReturn(uniClass);
    }

    @Test
    void when_add_new_hospitation_and_lecturer_of_any_of_reviewers_are_the_same_person_expect_exception(SoftAssertions softly) {
        newHospitationDTO = new NewHospitationDTO(List.of(), hospitatedLecturer.getLecturerId(),
                hospitatedLecturer.getLecturerId(), hospitatedLecturer.getLecturerId());

        var exception = assertThrows(ResponseStatusException.class, () -> hospitationService.addNewHospitation(newHospitationDTO));
        softly.assertThat(exception.getReason()).isEqualTo("Prowadzący nie może zostać hospitowany przez samego siebie");
        softly.assertThat(exception.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);

        verify(hospitationRepository, never()).save(any());
    }

    @Test
    void when_add_new_hospitation_and_hospitated_lecturer_doesnt_exist_expect_exception() {
        when(lecturerService.getLecturerByIdOrThrowException(hospitatedLecturer.getLecturerId()))
                .thenThrow(new ResponseStatusException(HttpStatus.NOT_FOUND, ""));

        var exception = assertThrows(ResponseStatusException.class, () -> hospitationService.addNewHospitation(newHospitationDTO));
        assertThat(exception.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        System.out.println(exception.getReason());


        verify(lecturerService).getLecturerByIdOrThrowException(hospitatedLecturer.getLecturerId());
        verify(lecturerService, never()).getLecturerByIdOrThrowException(wzhzReviewer.getLecturerId());
        verify(lecturerService, never()).getLecturerByIdOrThrowException(secondReviewer.getLecturerId());
        verify(hospitationRepository, never()).save(any());
    }

    @Test
    void when_add_new_hospitation_and_hospitated_lecturer_already_has_hospitation_planned_expect_exception(SoftAssertions softly) {
        when(hospitationRepository.existsByHospitatedLecturer_LecturerId(hospitatedLecturer.getLecturerId())).thenReturn(true);

        var exception = assertThrows(ResponseStatusException.class, () -> hospitationService.addNewHospitation(newHospitationDTO));
        softly.assertThat(exception.getReason()).isEqualTo("Podany hospitowany o id '1' posiada już zaplanowaną hospitację");
        softly.assertThat(exception.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);

        verify(lecturerService).getLecturerByIdOrThrowException(hospitatedLecturer.getLecturerId());
        verify(lecturerService, never()).getLecturerByIdOrThrowException(wzhzReviewer.getLecturerId());
        verify(lecturerService, never()).getLecturerByIdOrThrowException(secondReviewer.getLecturerId());
        verify(hospitationRepository, never()).save(any());
    }

    @Test
    void when_add_new_hospitation_and_wzhz_reviewer_doesnt_exist_expect_exception() {
        when(lecturerService.getLecturerByIdOrThrowException(wzhzReviewer.getLecturerId()))
                .thenThrow(new ResponseStatusException(HttpStatus.NOT_FOUND, ""));

        var exception = assertThrows(ResponseStatusException.class, () -> hospitationService.addNewHospitation(newHospitationDTO));
        assertThat(exception.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);

        verify(lecturerService).getLecturerByIdOrThrowException(wzhzReviewer.getLecturerId());
        verify(lecturerService, never()).getLecturerByIdOrThrowException(secondReviewer.getLecturerId());
        verify(hospitationRepository, never()).save(any());
    }

    @Test
    void when_add_new_hospitation_and_wzhz_reviewer_is_not_in_wzhz_expect_exception(SoftAssertions softly) {
        when(lecturerService.getLecturerByIdOrThrowException(2)).thenReturn(createTestLecturer(2, false));

        var exception = assertThrows(ResponseStatusException.class, () -> hospitationService.addNewHospitation(newHospitationDTO));
        softly.assertThat(exception.getReason()).isEqualTo("Podany hospitujący z komisji WZHZ o id '2' nie należy do komisji WZHZ");
        softly.assertThat(exception.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);

        verify(lecturerService, never()).getLecturerByIdOrThrowException(secondReviewer.getLecturerId());
        verify(hospitationRepository, never()).save(any());
    }

    @Test
    void when_add_new_hospitation_and_second_reviewer_doesnt_exist_expect_exception() {
        when(lecturerService.getLecturerByIdOrThrowException(secondReviewer.getLecturerId()))
                .thenThrow(new ResponseStatusException(HttpStatus.NOT_FOUND, ""));

        var exception = assertThrows(ResponseStatusException.class, () -> hospitationService.addNewHospitation(newHospitationDTO));
        assertThat(exception.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);


        verify(lecturerService).getLecturerByIdOrThrowException(secondReviewer.getLecturerId());
        verify(hospitationRepository, never()).save(any());
    }

    @Test
    void when_add_new_hospitation_and_given_classes_doesnt_exist_expect_exception() {
        int uniClassId = 123;
        Mockito.lenient().when(universityClassService.getUniversityClassByIdOrThrowException(uniClassId))
                .thenThrow(new ResponseStatusException(HttpStatus.NOT_FOUND, ""));
        newHospitationDTO = new NewHospitationDTO(List.of(uniClassId), hospitatedLecturer.getLecturerId(),
                wzhzReviewer.getLecturerId(), secondReviewer.getLecturerId());

        var exception = assertThrows(ResponseStatusException.class, () -> hospitationService.addNewHospitation(newHospitationDTO));
        assertThat(exception.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);

        verify(universityClassService).getUniversityClassByIdOrThrowException(uniClassId);
        verify(hospitationRepository, never()).save(any());
    }

    @Test
    void when_add_new_hospitation_and_given_classes_arent_conducted_by_hospitated_lecturer_expect_exception(SoftAssertions softly) {
        hospitatedLecturer.setClasses(List.of());

        var exception = assertThrows(ResponseStatusException.class, () -> hospitationService.addNewHospitation(newHospitationDTO));
        softly.assertThat(exception.getReason()).isEqualTo("Podane zajęcia nie są przeprowadzane przez hospitowanego");
        softly.assertThat(exception.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);

        verify(hospitationRepository, never()).save(any());
    }

    @Test
    void when_add_new_hospitation_expect_new_hospitation_added(SoftAssertions softly) {
        when(hospitationRepository.save(any())).thenReturn(hospitation);

        hospitation = hospitationService.addNewHospitation(newHospitationDTO);
        softly.assertThat(hospitation.getHospitatedLecturer().getLecturerId()).isEqualTo(hospitatedLecturer.getLecturerId());
        softly.assertThat(hospitation.getWzhzReviewer().getLecturerId()).isEqualTo(wzhzReviewer.getLecturerId());
        softly.assertThat(hospitation.getSecondReviewer().getLecturerId()).isEqualTo(secondReviewer.getLecturerId());

        verify(hospitationRepository).save(any());
    }

    @Test
    void when_get_hospitation_lecturers_for_reviewer_and_reviewer_doesnt_exist_expect_exception() {
        int reviewerId = wzhzReviewer.getLecturerId();
        when(lecturerService.getLecturerByIdOrThrowException(reviewerId))
                .thenThrow(new ResponseStatusException(HttpStatus.NOT_FOUND, ""));

        var exception = assertThrows(ResponseStatusException.class, () -> hospitationService.getHospitationLecturersForReviewer(reviewerId));
        assertThat(exception.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);

        verify(lecturerService).getLecturerByIdOrThrowException(reviewerId);
    }

    @Test
    void when_get_hospitation_lecturers_for_reviewer_expect_lecturers_with_hospitated_courses() {
        int reviewerId = wzhzReviewer.getLecturerId();
        when(hospitationRepository.findByWzhzReviewer_LecturerIdOrSecondReviewer_LecturerId(reviewerId, reviewerId))
                .thenReturn(List.of(hospitation));

        List<Hospitation> hospitations = hospitationService.getHospitationLecturersForReviewer(reviewerId);
        assertThat(hospitations.get(0).getWzhzReviewer().getLecturerId()).isEqualTo(reviewerId);

        verify(lecturerService).getLecturerByIdOrThrowException(reviewerId);
        verify(hospitationRepository).findByWzhzReviewer_LecturerIdOrSecondReviewer_LecturerId(reviewerId, reviewerId);
    }

    private Lecturer createTestLecturer(int id, boolean isInWZHZ) {
        return new Lecturer(id, "first name" + id, "last name" + id,
                Degree.DR, "department", isInWZHZ, List.of());
    }
}
