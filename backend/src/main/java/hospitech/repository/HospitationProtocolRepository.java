package hospitech.repository;

import hospitech.entity.HospitationProtocol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HospitationProtocolRepository extends JpaRepository<HospitationProtocol, Integer> {
}
