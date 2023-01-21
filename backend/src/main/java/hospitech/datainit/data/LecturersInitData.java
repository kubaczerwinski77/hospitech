package hospitech.datainit.data;

import hospitech.entity.Lecturer;
import hospitech.entity.enums.Degree;
import hospitech.repository.UniversityClassesRepository;

import java.util.List;

public class LecturersInitData {

    public static List<Lecturer> get(final UniversityClassesRepository repository) {
        return List.of(
                new Lecturer(0, "Kamil", "Nowak", Degree.PROF, "Fizyki",
                        true, List.of(repository.findByClassId(1), repository.findByClassId(2),
                        repository.findByClassId(21), repository.findByClassId(23))),
                new Lecturer(0, "Magdalena", "Kowalska", Degree.MGR_INZ, "Fizyki",
                        false, List.of(repository.findByClassId(3), repository.findByClassId(26))),
                new Lecturer(0, "Michal", "Orzel", Degree.DR, "Informatyki Stosowanej",
                        true, List.of(repository.findByClassId(4), repository.findByClassId(5), repository.findByClassId(17))),
                new Lecturer(0, "Marian", "Bobek", Degree.MGR_INZ, "Sprawiedliwosci",
                        true, List.of()),
                new Lecturer(0, "Dobromir", "Pawelek", Degree.DR_HAB, "Sprawiedliwosci",
                        false, List.of()),
                new Lecturer(0, "Pawel", "Nowaczewski", Degree.MGR_INZ, "Informatyki Stosowanej",
                        false, List.of(repository.findByClassId(6), repository.findByClassId(7),
                        repository.findByClassId(8), repository.findByClassId(12), repository.findByClassId(24))),
                new Lecturer(0, "Mariusz", "Pawlak", Degree.PROF, "Informatyki Stosowanej",
                        true, List.of(repository.findByClassId(9), repository.findByClassId(10),
                        repository.findByClassId(11))),
                new Lecturer(0, "Tomasz", "Pudzianowski", Degree.MGR_INZ, "Informatyki Stosowanej",
                        true, List.of(repository.findByClassId(13))),
                new Lecturer(0, "Przemyslaw", "Zabek", Degree.DR, "Informatyki Stosowanej",
                        true, List.of(repository.findByClassId(14))),
                new Lecturer(0, "Wlodzimierz", "Kubica", Degree.MGR_INZ, "Informatyki Stosowanej",
                        false, List.of(repository.findByClassId(15), repository.findByClassId(16))),
                new Lecturer(0, "Zbigniew", "Jagiello", Degree.PROF, "Matematyki",
                        false, List.of(repository.findByClassId(18), repository.findByClassId(19),
                        repository.findByClassId(25))),
                new Lecturer(0, "Jakub", "Maklowicz", Degree.MGR_INZ, "Matematyki",
                        false, List.of(repository.findByClassId(20))),
                new Lecturer(0, "Kacper", "Malysz", Degree.PROF, "Matematyki",
                        true, List.of(repository.findByClassId(22)))

        );
    }
}
