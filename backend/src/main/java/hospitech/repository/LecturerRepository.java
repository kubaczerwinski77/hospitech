package hospitech.repository;

import hospitech.entity.Lecturer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LecturerRepository extends JpaRepository<Lecturer, Integer> {

    List<Lecturer> findByIsInWZHZTrue();
}
