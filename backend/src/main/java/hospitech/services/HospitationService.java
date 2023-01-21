package hospitech.services;

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
        Lecturer hospitatedLecturer = lecturerService.getLecturerByIdOrThrowException(newHospitationDTO.hospitatedLecturer());
        Lecturer wzhzReviewer = lecturerService.getLecturerByIdOrThrowException(newHospitationDTO.wzhzReviewer());
        Lecturer secondReviewer = lecturerService.getLecturerByIdOrThrowException(newHospitationDTO.secondReviewer());
        var classes = newHospitationDTO.classIds().stream().
                map(universityClassService::getUniversityClassByIdOrThrowException)
                .toList();
        if (areClassesConductedByLecturer(hospitatedLecturer, classes)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Given classes are not conducted by hospiated lecturer");
        }
        var hospitation = new Hospitation(hospitatedLecturer, wzhzReviewer, secondReviewer, classes);
        return hospitationRepository.save(hospitation);
    }

    private boolean areClassesConductedByLecturer(Lecturer hospitatedLecturer, List<UniversityClass> classes) {
        return !new HashSet<>(hospitatedLecturer.getClasses()).containsAll(classes);
    }
}
