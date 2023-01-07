package hospitech.repository;

import hospitech.entity.HospitationProtocol;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "protocols", path = "protocols")
public interface HospitationProtocolRepository extends CrudRepository<HospitationProtocol, Integer> {
}
