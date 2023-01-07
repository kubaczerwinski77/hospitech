package hospitech.repository;

import hospitech.entity.UniversityClass;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "classes", path = "classes")
public interface UniversityClassesRepository extends CrudRepository<UniversityClass, Integer> {
}
