package hospitech.repository;

import hospitech.entity.HospitationProtocol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HospitationProtocolRepository extends JpaRepository<HospitationProtocol, Integer> {

    Optional<HospitationProtocol> getHospitationProtocolByHospitation_HospitationId(final int hospitationId);
}
