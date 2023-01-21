package hospitech.datainit.data;

import hospitech.entity.HospitationProtocol;
import hospitech.repository.HospitationProtocolQuestionsRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

public class HospitationProtocolsInitData {

    public static List<HospitationProtocol> get(final HospitationProtocolQuestionsRepository repository) {
        return List.of(
                new HospitationProtocol(0, repository.getReferenceById(1), null, 5,
                        "Wszystko zostało przeprowadzone wzorowo", "Przygotowac rzutnik przed zajeciami", true,
                        LocalDateTime.of(LocalDate.of(2023, 1, 14), LocalTime.of(12, 35)),
                        LocalDateTime.of(LocalDate.of(2023, 1, 13), LocalTime.of(17, 0)))
        );
    }
}
