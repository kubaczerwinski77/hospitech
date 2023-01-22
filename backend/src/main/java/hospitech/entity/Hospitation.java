package hospitech.entity;

import hospitech.dto.HospitationDTO;
import hospitech.entity.enums.HospitationStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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
    @OneToMany
    private List<UniversityClass> classesForHospitation;
    @OneToOne
    private HospitationProtocol protocol;

    public Hospitation(Lecturer hospitatedLecturer, Lecturer wzhzReviewer, Lecturer secondReviewer, List<UniversityClass> classesForHospitation) {
        this.isLecturerInformed = false;
        this.status = HospitationStatus.PLANNED;
        this.hospitatedLecturer = hospitatedLecturer;
        this.wzhzReviewer = wzhzReviewer;
        this.secondReviewer = secondReviewer;
        this.classesForHospitation = classesForHospitation;
    }

    public HospitationDTO toDTO() {
        return new HospitationDTO(hospitationId, hospitatedLecturer.toDTO(),
                wzhzReviewer.toDTO(), secondReviewer.toDTO(),
                classesForHospitation.stream().map(UniversityClass::toDTO).toList());
    }
}
