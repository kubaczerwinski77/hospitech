package hospitech.services;

import hospitech.repository.HospitationRepository;
import org.assertj.core.api.junit.jupiter.SoftAssertionsExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith({MockitoExtension.class, SoftAssertionsExtension.class})

class HospitationServiceTest {
    @Mock
    private LecturerService lecturerService;
    @Mock
    private HospitationRepository hospitationRepository;

    @Mock
    private UniversityClassService universityClassService;
    private HospitationService hospitationService;

    @BeforeEach
    void setUp() {
        hospitationService = new HospitationService(hospitationRepository, lecturerService, universityClassService);
    }

    @Test
    void when_add_new_hospitation_and_hospitated_lecturer_doesnt_exist_expect_exception() {

    }

    @Test
    void when_add_new_hospitation_and_wzhz_reviewer_doesnt_exist_expect_exception() {

    }

    @Test
    void when_add_new_hospitation_and_second_reviewer_doesnt_exist_expect_exception() {

    }

    @Test
    void when_add_new_hospitation_and_given_classes_doesnt_exist_expect_exception() {

    }

    @Test
    void when_add_new_hospitation_and_given_classes_arent_conducted_by_hospitated_lecturer_expect_exception() {

    }

    @Test
    void when_add_new_hospitation_expect_new_hospitation_added() {

    }
}
