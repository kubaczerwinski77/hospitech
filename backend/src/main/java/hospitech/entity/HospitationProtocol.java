package hospitech.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import hospitech.dto.HospitationProtocolDTO;
import hospitech.entity.enums.Grade;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "hospitation_protocols")
public class HospitationProtocol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int protocolId;
    @OneToOne
    private HospitationProtocolQuestions questions;
    private String environment; // jesli zdalne
    @NotNull
    @Enumerated(value = EnumType.STRING)
    private Grade grade;
    @NotNull
    private String gradeExplanation;
    private String commentsAndRecommendations;
    private boolean signed;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime signatureDate;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime protocolCreationDate;
    @OneToOne(mappedBy = "protocol", fetch = FetchType.LAZY)
    private Hospitation hospitation;

    @PrePersist
    protected void onCreate() {
        this.protocolCreationDate = LocalDateTime.now();
    }

    public HospitationProtocolDTO toDTO() {
        return new HospitationProtocolDTO(protocolId, questions, environment, grade, gradeExplanation,
                commentsAndRecommendations, signed, signatureDate, protocolCreationDate);
    }
}
