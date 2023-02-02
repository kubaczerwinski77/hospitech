package hospitech.datainit.data;

import hospitech.entity.HospitationProtocolQuestions;
import hospitech.entity.enums.Grade;

import java.util.List;

public class HospitationProtocolQuestionsInitData {

    public static List<HospitationProtocolQuestions> get() {
        return List.of(
                new HospitationProtocolQuestions(0, false, 0, "tak", 21, true, "", false, true, "Wszystko OK",
                        List.of(Grade.DOBRA, Grade.DOBRA, Grade.DOBRA, Grade.DOBRA, Grade.DOBRA, Grade.BARDZO_DOBRA, Grade.WZOROWA,
                                Grade.DOSTATECZNA, Grade.DOSTATECZNA, Grade.DOSTATECZNA,Grade.DOSTATECZNA, Grade.DOSTATECZNA, Grade.DOSTATECZNA,
                                Grade.DOSTATECZNA, Grade.WZOROWA, Grade.WZOROWA, Grade.DOBRA, Grade.WZOROWA, Grade.DOSTATECZNA))
        );
    }
}
