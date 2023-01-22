package hospitech.services;

import hospitech.entity.Course;
import hospitech.entity.Lecturer;
import hospitech.entity.UniversityClass;
import hospitech.entity.enums.DayOfTheWeek;
import hospitech.entity.enums.Degree;
import hospitech.repository.LecturerRepository;
import org.assertj.core.api.SoftAssertions;
import org.assertj.core.api.junit.jupiter.SoftAssertionsExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith({MockitoExtension.class, SoftAssertionsExtension.class})
class LecturerServiceTest {
    @Mock
    private LecturerRepository lecturerRepository;
    private LecturerService lecturerService;

    @BeforeEach
    void setUp() {
        lecturerService = new LecturerService(lecturerRepository);
    }

    @Test
    void when_get_lecturers_in_wzhz_expect_lecturers_in_wzhz() {
        when(lecturerRepository.findByIsInWZHZTrue()).thenReturn(getTestLecturers(true));
        var lecturers = lecturerService.getLecturers(true);

        assertThat(lecturers).hasSize(3);
        verify(lecturerRepository).findByIsInWZHZTrue();
        verify(lecturerRepository, never()).findAll();
    }

    @Test
    void when_get_lecturers_in_wzhz_expect_all_lecturers() {
        when(lecturerRepository.findAll()).thenReturn(getTestLecturers(false));
        var lecturers = lecturerService.getLecturers(false);

        assertThat(lecturers).hasSize(5);
        verify(lecturerRepository).findAll();
        verify(lecturerRepository, never()).findByIsInWZHZTrue();
    }

    @Test
    void when_get_lecturers_classes_and_lecturer_doesnt_exist_expect_exception() {
        int lecturerId = 12345;
        when(lecturerRepository.findById(lecturerId)).thenReturn(Optional.empty());

        var exception = assertThrows(ResponseStatusException.class, () -> lecturerService.getLecturersClasses(lecturerId, ""));
        assertThat(exception.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        verify(lecturerRepository).findById(lecturerId);
    }

    @Test
    void when_get_lecturers_classes_and_lecturer_have_no_classes_in_given_semester_expect_empty_list(SoftAssertions softly) {
        int lecturerId = 1;
        when(lecturerRepository.findById(lecturerId)).thenReturn(getTestLecturerWithClasses("zimowy 2022/2023"));

        var classes = lecturerService.getLecturersClasses(lecturerId, "letni 2020/2023");
        softly.assertThat(classes).isNotNull();
        softly.assertThat(classes).hasSize(0);
        verify(lecturerRepository).findById(lecturerId);
    }

    @Test
    void when_get_lecturers_classes_expect_list_of_classes(SoftAssertions softly) {
        int lecturerId = 1;
        String semester = "zimowy 2022/2023";
        when(lecturerRepository.findById(lecturerId)).thenReturn(getTestLecturerWithClasses(semester));

        var classes = lecturerService.getLecturersClasses(lecturerId, semester);
        softly.assertThat(classes).isNotNull();
        softly.assertThat(classes).hasSize(3);
        verify(lecturerRepository).findById(lecturerId);
    }

    private List<Lecturer> getTestLecturers(boolean inWZHZ) {
        List<Lecturer> lecturers = new ArrayList<>(List.of(
                new Lecturer("first name 1", "last name 1", Degree.DR, "department 1", true),
                new Lecturer("first name 2", "last name 2", Degree.MGR, "department 1", true),
                new Lecturer("first name 3", "last name 3", Degree.DR_HAB, "department 2", true)));
        if (!inWZHZ) {
            lecturers.addAll(List.of(
                    new Lecturer("first name 4", "last name 4", Degree.DR, "department 3", false),
                    new Lecturer("first name 5", "last name 5", Degree.MGR, "department 3", false)));
        }
        return lecturers;
    }

    private Optional<Lecturer> getTestLecturerWithClasses(String semester) {
        var lecturer = getTestLecturers(false).get(0);
        lecturer.setClasses(List.of(
                new UniversityClass("D-1", "329", new Course(), LocalTime.of(13, 15), LocalTime.of(15, 0), DayOfTheWeek.MONDAY, semester),
                new UniversityClass("D-2", "333b", new Course(), LocalTime.of(11, 15), LocalTime.of(13, 0), DayOfTheWeek.TUESDAY, semester),
                new UniversityClass("D-2", "333a", new Course(), LocalTime.of(13, 15), LocalTime.of(15, 0), DayOfTheWeek.FRIDAY, semester)
        ));
        return Optional.of(lecturer);
    }

}
