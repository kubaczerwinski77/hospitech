package hospitech.services;

import hospitech.repository.HospitationRepository;
import org.springframework.stereotype.Service;

@Service
public class HospitationService {
    private final HospitationRepository hospitationRepository;

    public HospitationService(HospitationRepository hospitationRepository) {
        this.hospitationRepository = hospitationRepository;
    }
}
