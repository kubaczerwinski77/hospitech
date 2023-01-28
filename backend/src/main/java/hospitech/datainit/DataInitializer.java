package hospitech.datainit;

import hospitech.datainit.data.*;
import hospitech.repository.*;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class DataInitializer {

    private UniversityClassesRepository universityClassesRepository;
    private CourseRepository courseRepository;
    private LecturerRepository lecturerRepository;
    private HospitationRepository hospitationRepository;
    private HospitationProtocolRepository hospitationProtocolRepository;
    private HospitationProtocolQuestionsRepository hospitationProtocolQuestionsRepository;

    public DataInitializer(UniversityClassesRepository universityClassesRepository, CourseRepository courseRepository,
                           LecturerRepository lecturerRepository, HospitationRepository hospitationRepository,
                           HospitationProtocolRepository hospitationProtocolRepository,
                           HospitationProtocolQuestionsRepository hospitationProtocolQuestionsRepository) {
        this.universityClassesRepository = universityClassesRepository;
        this.courseRepository = courseRepository;
        this.lecturerRepository = lecturerRepository;
        this.hospitationRepository = hospitationRepository;
        this.hospitationProtocolRepository = hospitationProtocolRepository;
        this.hospitationProtocolQuestionsRepository = hospitationProtocolQuestionsRepository;
    }

    @PostConstruct
    void init() {
        fillData();
    }

    @Transactional
    void fillData() {
        courseRepository.saveAll(CoursesInitData.get());
        universityClassesRepository.saveAll(UniversityClassesInitData.get(courseRepository));
        lecturerRepository.saveAll(LecturersInitData.get(universityClassesRepository));
        hospitationProtocolQuestionsRepository.saveAll(HospitationProtocolQuestionsInitData.get());
        hospitationProtocolRepository.saveAll(HospitationProtocolsInitData.get(hospitationProtocolQuestionsRepository));
        hospitationRepository.saveAll(HospitationsInitData.get(lecturerRepository, universityClassesRepository,
                hospitationProtocolRepository));
    }

}
