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

    public List<Lecturer> getLecturersInWZHZ() {
        return lecturerRepository.findByIsInWZHZTrue();
    }

    public List<UniversityClass> getLecturersClasses(int lecturerId, String semester) {
        var lecturer = lecturerRepository.findById(lecturerId)
                .orElseThrow(
                        () -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                String.format("Lecturer with id '%d' doesn't exist", lecturerId))
                );
        return lecturer.getClasses()
                .stream()
                .filter(uniClass -> uniClass.getSemester().equals(semester))
                .toList();
    }
}
