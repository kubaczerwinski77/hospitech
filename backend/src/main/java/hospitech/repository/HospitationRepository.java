package hospitech.repository;

import hospitech.entity.Hospitation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HospitationRepository extends JpaRepository<Hospitation, Integer> {
}
