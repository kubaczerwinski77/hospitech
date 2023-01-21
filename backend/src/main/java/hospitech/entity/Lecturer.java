package hospitech.entity;

import hospitech.dto.LecturerDTO;
import hospitech.entity.enums.Degree;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "lecturers")
public class Lecturer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int lecturerId;
    private String firstName;
    private String lastName;
    @Enumerated(EnumType.STRING)
    private Degree degree;
    private String department;
    private boolean isInWZHZ;
    @OneToMany
    private List<UniversityClass> classes;

    public Lecturer(String firstName, String lastName, Degree degree, String department, boolean isInWZHZ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.degree = degree;
        this.department = department;
        this.isInWZHZ = isInWZHZ;
    }

    public LecturerDTO toDTO() {
        return new LecturerDTO(lecturerId, firstName, lastName, degree, department, isInWZHZ);
    }
}
