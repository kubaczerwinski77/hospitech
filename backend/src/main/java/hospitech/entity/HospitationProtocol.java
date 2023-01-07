package hospitech.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "hospitation_protocols")
public class HospitationProtocol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int protocolId;
    private int grade;
    private String gradeExplanation;
    private String comments;
    private String recommendations;
    private boolean signed;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime signatureDate;
    private LocalDateTime protocolCreationDate;
    private String environment;

    @PrePersist
    protected void onCreate() {
        this.protocolCreationDate = LocalDateTime.now();
    }
}
