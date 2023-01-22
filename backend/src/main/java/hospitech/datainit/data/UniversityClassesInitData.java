package hospitech.datainit.data;

import hospitech.entity.UniversityClass;
import hospitech.entity.enums.DayOfTheWeek;
import hospitech.entity.enums.ModeOfStudies;
import hospitech.entity.enums.StudiesDegree;
import hospitech.repository.CourseRepository;

import java.time.LocalTime;
import java.util.List;

public class UniversityClassesInitData {

    public static List<UniversityClass> get(final CourseRepository courseRepository) {
        return List.of(
                new UniversityClass(0, "A1", "333", courseRepository.findByCode("K01w"), LocalTime.of(7, 30),
                        LocalTime.of(9, 0), DayOfTheWeek.MONDAY, "zimowy 2022/2023", StudiesDegree.BA, ModeOfStudies.FULL_TIME),
                new UniversityClass(0, "A1", "333", courseRepository.findByCode("K01c"), LocalTime.of(9, 15),
                        LocalTime.of(11, 0), DayOfTheWeek.TUESDAY, "zimowy 2022/2023", StudiesDegree.BA, ModeOfStudies.FULL_TIME),
                new UniversityClass(0, "A2", "29", courseRepository.findByCode("K01c"), LocalTime.of(13, 15),
                        LocalTime.of(15, 0), DayOfTheWeek.THURSDAY, "zimowy 2022/2023", StudiesDegree.BA, ModeOfStudies.FULL_TIME),
                new UniversityClass(0, "D1", "30", courseRepository.findByCode("K02w"), LocalTime.of(17, 5),
                        LocalTime.of(18, 35), DayOfTheWeek.FRIDAY, "zimowy 2022/2023", StudiesDegree.BA, ModeOfStudies.FULL_TIME),
                new UniversityClass(0, "D2", "127b", courseRepository.findByCode("K02l"), LocalTime.of(9, 15),
                        LocalTime.of(11, 0), DayOfTheWeek.THURSDAY, "zimowy 2022/2023", StudiesDegree.BA, ModeOfStudies.FULL_TIME),
                new UniversityClass(0, "D2", "127b", courseRepository.findByCode("K02l"), LocalTime.of(11, 15),
                        LocalTime.of(13, 0), DayOfTheWeek.THURSDAY, "zimowy 2022/2023", StudiesDegree.BA, ModeOfStudies.FULL_TIME),
                new UniversityClass(0, "D2", "127b", courseRepository.findByCode("K02l"), LocalTime.of(9, 15),
                        LocalTime.of(11, 0), DayOfTheWeek.WEDNESDAY, "zimowy 2022/2023", StudiesDegree.BA, ModeOfStudies.FULL_TIME),
                new UniversityClass(0, "D2", "127a", courseRepository.findByCode("K02l"), LocalTime.of(9, 15),
                        LocalTime.of(11, 0), DayOfTheWeek.WEDNESDAY, "zimowy 2022/2023", StudiesDegree.BA, ModeOfStudies.FULL_TIME),
                new UniversityClass(0, "A4", "12", courseRepository.findByCode("K03w"), LocalTime.of(17, 5),
                        LocalTime.of(18, 45), DayOfTheWeek.MONDAY, "zimowy 2022/2023", StudiesDegree.BA, ModeOfStudies.FULL_TIME),
                new UniversityClass(0, "D2", "333b", courseRepository.findByCode("K03c"), LocalTime.of(18, 55),
                        LocalTime.of(20, 35), DayOfTheWeek.MONDAY, "zimowy 2022/2023", StudiesDegree.BA, ModeOfStudies.FULL_TIME),
                new UniversityClass(0, "D2", "333b", courseRepository.findByCode("K03c"), LocalTime.of(15, 15),
                        LocalTime.of(16, 45), DayOfTheWeek.MONDAY, "zimowy 2022/2023", StudiesDegree.BA, ModeOfStudies.FULL_TIME),
                new UniversityClass(0, "A4", "444", courseRepository.findByCode("K03l"), LocalTime.of(9, 15),
                        LocalTime.of(10, 45), DayOfTheWeek.THURSDAY, "zimowy 2022/2023", StudiesDegree.BA, ModeOfStudies.FULL_TIME),
                new UniversityClass(0, "A4", "444", courseRepository.findByCode("K03l"), LocalTime.of(9, 15),
                        LocalTime.of(10, 45), DayOfTheWeek.TUESDAY, "zimowy 2022/2023", StudiesDegree.BA, ModeOfStudies.FULL_TIME),
                new UniversityClass(0, "D1", "30", courseRepository.findByCode("K04w"), LocalTime.of(11, 15),
                        LocalTime.of(13, 0), DayOfTheWeek.TUESDAY, "zimowy 2022/2023", StudiesDegree.BA, ModeOfStudies.FULL_TIME),
                new UniversityClass(0, "D1", "127a", courseRepository.findByCode("K04l"), LocalTime.of(11, 15),
                        LocalTime.of(13, 0), DayOfTheWeek.WEDNESDAY, "zimowy 2022/2023", StudiesDegree.BA, ModeOfStudies.FULL_TIME),
                new UniversityClass(0, "D1", "127a", courseRepository.findByCode("K04l"), LocalTime.of(11, 15),
                        LocalTime.of(13, 0), DayOfTheWeek.MONDAY, "zimowy 2022/2023", StudiesDegree.BA, ModeOfStudies.FULL_TIME),
                new UniversityClass(0, "D1", "127a", courseRepository.findByCode("K04l"), LocalTime.of(11, 15),
                        LocalTime.of(13, 0), DayOfTheWeek.FRIDAY, "zimowy 2022/2023", StudiesDegree.BA, ModeOfStudies.FULL_TIME),
                new UniversityClass(0, "A1", "333", courseRepository.findByCode("K05w"), LocalTime.of(7, 30),
                        LocalTime.of(9, 0), DayOfTheWeek.FRIDAY, "zimowy 2022/2023", StudiesDegree.BA, ModeOfStudies.FULL_TIME),
                new UniversityClass(0, "A1", "123", courseRepository.findByCode("K05c"), LocalTime.of(9, 15),
                        LocalTime.of(10, 45), DayOfTheWeek.MONDAY, "zimowy 2022/2023", StudiesDegree.BA, ModeOfStudies.FULL_TIME),
                new UniversityClass(0, "A1", "123", courseRepository.findByCode("K05c"), LocalTime.of(11, 0),
                        LocalTime.of(13, 45), DayOfTheWeek.MONDAY, "zimowy 2022/2023", StudiesDegree.BA, ModeOfStudies.FULL_TIME),
                new UniversityClass(0, "A1", "123", courseRepository.findByCode("K05c"), LocalTime.of(7, 30),
                        LocalTime.of(9, 0), DayOfTheWeek.TUESDAY, "zimowy 2022/2023", StudiesDegree.BA, ModeOfStudies.FULL_TIME),
                new UniversityClass(0, "A1", "333", courseRepository.findByCode("K06w"), LocalTime.of(15, 15),
                        LocalTime.of(17, 0), DayOfTheWeek.WEDNESDAY, "zimowy 2022/2023", StudiesDegree.BA, ModeOfStudies.FULL_TIME),
                new UniversityClass(0, "A1", "333", courseRepository.findByCode("K06c"), LocalTime.of(17, 5),
                        LocalTime.of(18, 35), DayOfTheWeek.WEDNESDAY, "zimowy 2022/2023", StudiesDegree.BA, ModeOfStudies.FULL_TIME),
                new UniversityClass(0, "D1", "234a", courseRepository.findByCode("K06c"), LocalTime.of(18, 55),
                        LocalTime.of(20, 35), DayOfTheWeek.WEDNESDAY, "zimowy 2022/2023", StudiesDegree.BA, ModeOfStudies.FULL_TIME),
                new UniversityClass(0, "D1", "333", courseRepository.findByCode("K06c"), LocalTime.of(15, 15),
                        LocalTime.of(17, 0), DayOfTheWeek.FRIDAY, "zimowy 2022/2023", StudiesDegree.BA, ModeOfStudies.FULL_TIME),
                new UniversityClass(0, "A1", "333", courseRepository.findByCode("K06c"), LocalTime.of(17, 5),
                        LocalTime.of(18, 35), DayOfTheWeek.FRIDAY, "zimowy 2022/2023", StudiesDegree.BA, ModeOfStudies.FULL_TIME)

        );
    }
}
