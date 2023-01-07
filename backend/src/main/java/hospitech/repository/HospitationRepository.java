package hospitech.repository;

import hospitech.entity.Hospitation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "hospitations")
public interface HospitationRepository extends CrudRepository<Hospitation, Integer> {
}
