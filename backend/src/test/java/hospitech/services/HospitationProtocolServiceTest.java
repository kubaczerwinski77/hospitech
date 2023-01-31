package hospitech.services;

import hospitech.dto.NewHospitationProtocolDTO;
import hospitech.entity.Hospitation;
import hospitech.entity.HospitationProtocol;
import hospitech.entity.HospitationProtocolQuestions;
import hospitech.entity.enums.Grade;
import hospitech.repository.HospitationProtocolQuestionsRepository;
import hospitech.repository.HospitationProtocolRepository;
import hospitech.repository.HospitationRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class HospitationProtocolServiceTest {

    @Mock
    private HospitationProtocolRepository protocolRepository;
    @Mock
    private HospitationRepository hospitationRepository;
    @Mock
    private HospitationProtocolQuestionsRepository protocolQuestionsRepository;
    @InjectMocks
    private HospitationProtocolService protocolService;

    private static NewHospitationProtocolDTO newProtocol;
    private static HospitationProtocolQuestions protocolQuestions;

    @BeforeAll
    static void setup() {
        protocolQuestions = new HospitationProtocolQuestions();
        final String environment = "environment";
        final Grade grade = Grade.DOBRA;
        final String gradeExplanation = "gradeExplanation";
        final String commentsAndRecommendations = "commentsAndRecommendations";

        newProtocol = new NewHospitationProtocolDTO(protocolQuestions, environment,
                grade, gradeExplanation, commentsAndRecommendations);
    }

    @Test
    public void getAllProtocols_shouldReturnAllProtocolsInSystem() {
        List<HospitationProtocol> savedProtocols = List.of(new HospitationProtocol(), new HospitationProtocol());
        when(protocolRepository.findAll()).thenReturn(savedProtocols);

        final List<HospitationProtocol> returnedProtocols = protocolService.getAllProtocols();

        assertThat(returnedProtocols).hasSize(2);
        assertThat(returnedProtocols).containsExactlyInAnyOrderElementsOf(savedProtocols);
    }

    @Test
    public void getProtocolForHospitation_shouldReturnsHospitationProtcol_whenHospitationIsPresent() {
        final HospitationProtocol hospitationProtocol = new HospitationProtocol();
        when(protocolRepository.getHospitationProtocolByHospitation_HospitationId(anyInt()))
                .thenReturn(Optional.of(hospitationProtocol));

        assertThat(protocolService.getProtocolForHospitation(1)).isEqualTo(hospitationProtocol);
    }

    @Test
    public void getProtocolForHospitation_shouldThrowNotFoundResponseStatusException_whenHospitationProtocolIsNotFound() {
        when(protocolRepository.getHospitationProtocolByHospitation_HospitationId(anyInt()))
                .thenReturn(Optional.empty());

        final ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> protocolService.getProtocolForHospitation(1));

        assertThat(exception.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    public void saveProtocol_shouldSaveProtocol_whenItsHospitationIsPresentAndHasNoProtocol() {
        final Hospitation hospitation = new Hospitation();

        when(hospitationRepository.getHospitationByHospitationId(anyInt())).thenReturn(Optional.of(hospitation));
        when(protocolRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);
        when(protocolQuestionsRepository.save(any())).thenReturn(protocolQuestions);

        assertThat(hospitation.getProtocol()).isNull();

        final HospitationProtocol protocol = protocolService.saveProtocol(newProtocol, 1);

        assertThat(hospitation.getProtocol()).isNotNull();
        assertThat(protocol.getHospitation()).isEqualTo(hospitation);
        assertThat(protocol.getEnvironment()).isEqualTo(newProtocol.environment());
        assertThat(protocol.getGrade()).isEqualTo(newProtocol.grade());
        assertThat(protocol.getGradeExplanation()).isEqualTo(newProtocol.gradeExplanation());
        assertThat(protocol.getCommentsAndRecommendations()).isEqualTo(newProtocol.commentsAndRecommendations());
        assertThat(protocol.getQuestions()).isEqualTo(protocolQuestions);

        verify(protocolRepository).save(any());
        verify(protocolQuestionsRepository).save(protocolQuestions);
    }

    @Test
    public void saveProtocol_shouldThrowBadRequestException_whenHospitationIsNotFound() {
        final int hospitationId = 1;
        when(hospitationRepository.getHospitationByHospitationId(anyInt())).thenReturn(Optional.empty());

        final ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> protocolService.saveProtocol(newProtocol, hospitationId));

        assertThat(exception.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        assertThat(exception.getReason()).isEqualTo(String.format("Hospitacja o id: '%d' nie istnieje", hospitationId));
    }

    @Test
    public void saveProtocol_shouldThrowBadRequestException_whenHospitationAlreadyHasProtocol() {
        final int hospitationId = 1;
        final Hospitation hospitation = new Hospitation();
        hospitation.setHospitationId(hospitationId);
        hospitation.setProtocol(new HospitationProtocol());

        when(hospitationRepository.getHospitationByHospitationId(anyInt())).thenReturn(Optional.of(hospitation));

        final ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> protocolService.saveProtocol(newProtocol, hospitationId));

        assertThat(exception.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(exception.getReason()).isEqualTo(String.format("Hospitacja o id: '%d' ma juz protokol hospitacji",
                hospitationId));
    }

}
