package hospitech.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
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
    private int grade;
    @NotNull
    private String gradeExplanation;
    private String commentsAndRecommendations;
    private boolean signed;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime signatureDate;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime protocolCreationDate;

    @PrePersist
    protected void onCreate() {
        this.protocolCreationDate = LocalDateTime.now();
    }
}
