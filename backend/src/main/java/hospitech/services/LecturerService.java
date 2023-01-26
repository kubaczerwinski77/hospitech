package hospitech.services;

import hospitech.entity.Lecturer;
import hospitech.entity.UniversityClass;
import hospitech.repository.LecturerRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class LecturerService {
    private final LecturerRepository lecturerRepository;


    public LecturerService(LecturerRepository lecturerRepository) {
        this.lecturerRepository = lecturerRepository;
    }

    public List<Lecturer> getLecturers(boolean isInWZHZ) {
        if (isInWZHZ) {
            return lecturerRepository.findByIsInWZHZTrue();
        }
        return lecturerRepository.findAll();
    }

    public List<UniversityClass> getLecturersClasses(int lecturerId, String semester) {
        var lecturer = getLecturerByIdOrThrowException(lecturerId);
        return lecturer.getClasses()
                .stream()
                .filter(uniClass -> uniClass.getSemester().equals(semester))
                .toList();
    }

    public Lecturer getLecturerByIdOrThrowException(int lecturerId) {
        return lecturerRepository.findById(lecturerId).orElseThrow(
                () -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        String.format("Prowadzący o id '%d' nie istnieje", lecturerId))
        );
    }
}
