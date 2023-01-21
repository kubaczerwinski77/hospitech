package hospitech.repository;

import hospitech.entity.HospitationProtocolQuestions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HospitationProtocolQuestionsRepository extends JpaRepository<HospitationProtocolQuestions, Integer> {
}
