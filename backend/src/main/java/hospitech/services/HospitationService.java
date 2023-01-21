package hospitech.services;

import hospitech.dto.LecturerWithCoursesDTO;
import hospitech.dto.NewHospitationDTO;
import hospitech.entity.Hospitation;
import hospitech.entity.Lecturer;
import hospitech.entity.UniversityClass;
import hospitech.repository.HospitationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.List;

@Service
public class HospitationService {
    private final HospitationRepository hospitationRepository;
    private final LecturerService lecturerService;
    private final UniversityClassService universityClassService;

    public HospitationService(HospitationRepository hospitationRepository, LecturerService lecturerService,
                              UniversityClassService universityClassService) {
        this.hospitationRepository = hospitationRepository;
        this.lecturerService = lecturerService;
        this.universityClassService = universityClassService;
    }

    public List<Hospitation> getHospitations() {
        return hospitationRepository.findAll();
    }

    public Hospitation addNewHospitation(NewHospitationDTO newHospitationDTO) {
        throwExceptionIfAnyOfLecturersAreTheSame(
                newHospitationDTO.hospitatedLecturer(), newHospitationDTO.wzhzReviewer(), newHospitationDTO.secondReviewer());
        Lecturer hospitatedLecturer = lecturerService.getLecturerByIdOrThrowException(newHospitationDTO.hospitatedLecturer());
        throwExceptionIfLecturerHaveHospitationAlready(newHospitationDTO.hospitatedLecturer());
        Lecturer wzhzReviewer = lecturerService.getLecturerByIdOrThrowException(newHospitationDTO.wzhzReviewer());
        Lecturer secondReviewer = lecturerService.getLecturerByIdOrThrowException(newHospitationDTO.secondReviewer());
        var classes = newHospitationDTO.classIds().stream().
                map(universityClassService::getUniversityClassByIdOrThrowException)
                .toList();
        if (areClassesConductedByLecturer(hospitatedLecturer, classes)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Given classes are not conducted by hospitated lecturer");
        }
        var hospitation = new Hospitation(hospitatedLecturer, wzhzReviewer, secondReviewer, classes);
        return hospitationRepository.save(hospitation);
    }

    private void throwExceptionIfAnyOfLecturersAreTheSame(int lecturer, int wzhzReviewer, int secondReviewer) {
        if (lecturer == wzhzReviewer || lecturer == secondReviewer) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Lecturer cannot be reviewed by himself");
        } else if (wzhzReviewer == secondReviewer) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Wzhz reviewer and second reviewer cannot be the same person");
        }
    }

    private void throwExceptionIfLecturerHaveHospitationAlready(int lecturerId) {
        if (hospitationRepository.existsByHospitatedLecturer_LecturerId(lecturerId)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    String.format("Given hospitated lecturer with id '%d' already has hospitation planned", lecturerId)
            );
        }
    }

    private boolean areClassesConductedByLecturer(Lecturer hospitatedLecturer, List<UniversityClass> classes) {
        return !new HashSet<>(hospitatedLecturer.getClasses()).containsAll(classes);
    }

    public List<LecturerWithCoursesDTO> getHospitationLecturersForReviewer(int reviewerId) {
        lecturerService.getLecturerByIdOrThrowException(reviewerId);
        List<Hospitation> hospitations = hospitationRepository
                .findByWzhzReviewer_LecturerIdOrSecondReviewer_LecturerId(reviewerId, reviewerId);
        return hospitations.stream()
                .map(this::getHospitatedLecturerWithCoursesDTO)
                .toList();
    }

    private LecturerWithCoursesDTO getHospitatedLecturerWithCoursesDTO(Hospitation hospitation) {
        return new LecturerWithCoursesDTO(hospitation.getHospitatedLecturer().toDTO(),
                hospitation.getClassesForHospitation()
                        .stream()
                        .map(uniClass -> uniClass.getCourse().toDTO())
                        .toList());
    }
}
