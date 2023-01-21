package hospitech.services;

import hospitech.entity.UniversityClass;
import hospitech.repository.UniversityClassesRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UniversityClassService {
    private final UniversityClassesRepository universityClassesRepository;

    public UniversityClassService(UniversityClassesRepository universityClassesRepository) {
        this.universityClassesRepository = universityClassesRepository;
    }

    public UniversityClass getUniversityClassByIdOrThrowException(int universityClassId) {
        return universityClassesRepository.findById(universityClassId).orElseThrow(
                () -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        String.format("University class with id '%d' doesn't exist", universityClassId))
        );
    }
}
