package hospitech.repository;

import hospitech.entity.Lecturer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "lecturers")
public interface LecturerRepository extends CrudRepository<Lecturer, Integer> {
}
