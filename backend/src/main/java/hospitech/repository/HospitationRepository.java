package hospitech.repository;

import hospitech.entity.Hospitation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HospitationRepository extends JpaRepository<Hospitation, Integer> {
    boolean existsByHospitatedLecturer_LecturerId(int lecturerId);

    List<Hospitation> findByWzhzReviewer_LecturerIdOrSecondReviewer_LecturerId(int lecturerId, int lecturerId1);
}
