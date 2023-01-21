package hospitech.entity;

import hospitech.entity.enums.HospitationStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "hospitations")
public class Hospitation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int hospitationId;
    private boolean isLecturerInformed;
    @Enumerated(EnumType.STRING)
    private HospitationStatus status;
    @OneToOne
    private Lecturer hospitatedLecturer;
    @ManyToOne
    @JoinColumn(name = "wzhz_lecturer")
    private Lecturer wzhzReviewer;
    @ManyToOne
    @JoinColumn(name = "second_lecturer")
    private Lecturer secondReviewer;
    @OneToOne
    private UniversityClass hospitatedClass;
    @OneToOne
    private HospitationProtocol protocol;
}
