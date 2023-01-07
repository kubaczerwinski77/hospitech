package hospitech.repository;

import hospitech.entity.Course;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "courses")
public interface CourseRepository extends CrudRepository<Course, Integer> {
}
