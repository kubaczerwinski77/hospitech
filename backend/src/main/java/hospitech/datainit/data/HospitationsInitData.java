package hospitech.datainit.data;

import hospitech.entity.Hospitation;
import hospitech.entity.enums.HospitationStatus;
import hospitech.repository.HospitationProtocolRepository;
import hospitech.repository.LecturerRepository;
import hospitech.repository.UniversityClassesRepository;

import java.util.List;

public class HospitationsInitData {

    public static List<Hospitation> get(final LecturerRepository lecturerRepository,
                                        final UniversityClassesRepository universityClassesRepository,
                                        final HospitationProtocolRepository protocolRepository) {
        return List.of(
                new Hospitation(0, true, HospitationStatus.HELD, lecturerRepository.getReferenceById(2),
                        lecturerRepository.getReferenceById(1), lecturerRepository.getReferenceById(3),
                        universityClassesRepository.findByClassId(1), protocolRepository.getReferenceById(1)),
                new Hospitation(0, true, HospitationStatus.CANCELLED, lecturerRepository.getReferenceById(8),
                        lecturerRepository.getReferenceById(7), lecturerRepository.getReferenceById(10),
                        universityClassesRepository.findByClassId(13), null),
                new Hospitation(0, true, HospitationStatus.PLANNED, lecturerRepository.getReferenceById(1),
                        lecturerRepository.getReferenceById(9), lecturerRepository.getReferenceById(5),
                        universityClassesRepository.findByClassId(2), null),
                new Hospitation(0, false, HospitationStatus.PLANNED, lecturerRepository.getReferenceById(10),
                        lecturerRepository.getReferenceById(13), lecturerRepository.getReferenceById(11),
                        universityClassesRepository.findByClassId(15), null),
                new Hospitation(0, true, HospitationStatus.PLANNED, lecturerRepository.getReferenceById(3),
                        lecturerRepository.getReferenceById(13), lecturerRepository.getReferenceById(2),
                        universityClassesRepository.findByClassId(5), null)
        );
    }
}