package hospitech.services;

import hospitech.dto.NewHospitationProtocolDTO;
import hospitech.entity.Hospitation;
import hospitech.entity.HospitationProtocol;
import hospitech.entity.HospitationProtocolQuestions;
import hospitech.repository.HospitationProtocolQuestionsRepository;
import hospitech.repository.HospitationProtocolRepository;
import hospitech.repository.HospitationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class HospitationProtocolService {

    private HospitationProtocolRepository protocolRepository;
    private HospitationRepository hospitationRepository;

    private HospitationProtocolQuestionsRepository questionsRepository;

    public HospitationProtocolService(HospitationProtocolRepository protocolRepository, HospitationRepository hospitationRepository, HospitationProtocolQuestionsRepository questionsRepository) {
        this.protocolRepository = protocolRepository;
        this.hospitationRepository = hospitationRepository;
        this.questionsRepository = questionsRepository;
    }

    public List<HospitationProtocol> getAllProtocols() {
        return protocolRepository.findAll();
    }

    public HospitationProtocol getProtocolForHospitation(final int hospitationId) {
        final Optional<HospitationProtocol> hospitationProtocol =
                protocolRepository.getHospitationProtocolByHospitation_HospitationId(hospitationId);
        return hospitationProtocol.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public HospitationProtocol saveProtocol(final NewHospitationProtocolDTO newProtocol, final int hospitationId) {

        final Hospitation hospitation = hospitationRepository.getHospitationByHospitationId(hospitationId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        throwExceptionIfHospitationAlreadyHasProtocol(hospitation);

        final HospitationProtocolQuestions protocolQuestions = questionsRepository.save(newProtocol.questions());

        final HospitationProtocol protocol = HospitationProtocol.builder()
                .protocolId(0)
                .questions(protocolQuestions)
                .environment(newProtocol.environment())
                .grade(newProtocol.grade())
                .gradeExplanation(newProtocol.gradeExplanation())
                .commentsAndRecommendations(newProtocol.commentsAndRecommendations())
                .build();

        hospitation.setProtocol(protocol);

        return protocolRepository.save(protocol);
    }

    private void throwExceptionIfHospitationAlreadyHasProtocol(final Hospitation hospitation) {
        if(hospitation.getProtocol() != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    String.format("Hospitacja o id: '%d' ma juz protokol hospitacji", hospitation.getHospitationId()));
        }
    }
}
