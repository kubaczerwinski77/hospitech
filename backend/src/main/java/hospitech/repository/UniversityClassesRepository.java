package hospitech.repository;

import hospitech.entity.UniversityClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UniversityClassesRepository extends JpaRepository<UniversityClass, Integer> {

    UniversityClass findByClassId(final int classId);
}
