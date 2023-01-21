package hospitech.services;

import hospitech.repository.UniversityClassesRepository;
import org.springframework.stereotype.Service;

@Service
public class UniversityClassService {
    private final UniversityClassesRepository universityClassesRepository;

    public UniversityClassService(UniversityClassesRepository universityClassesRepository) {
        this.universityClassesRepository = universityClassesRepository;
    }
}
