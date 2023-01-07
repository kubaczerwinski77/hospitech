package hospitech.entity;

import hospitech.entity.enums.Degree;
import jakarta.persistence.*;
import lombok.Data;

@Data
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

}
