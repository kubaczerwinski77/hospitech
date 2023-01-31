import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, PREFIX } from "../../config";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import { Flex } from "@chakra-ui/react";
import { mapToDayOfMonth } from "../../utils";

const Appointment = ({ children, style, data, ...restProps }) => {
  const { building, room } = data;
  return (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        color: "white",
        backgroundColor: "#68D391",
        borderRadius: "8px",
      }}
    >
      {children}
      <p
        style={{ padding: "8px 0 0 8px", fontWeight: "bold" }}
      >{`Budynek ${building}`}</p>
      <p
        style={{ padding: "8px 0 0 8px", fontWeight: "bold" }}
      >{`Sala ${room}`}</p>
    </Appointments.Appointment>
  );
};

const LecturersPlan = () => {
  const { id } = useParams();
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      const res = await fetch(
        `${BASE_URL}${PREFIX}/lecturers/${id}/classes?semester=zimowy%202022%2F2023`
      );
      const data = await res.json();
      setClasses(data);
    };
    fetchClasses();
  }, [id]);

  const appointments = classes.map(
    ({
      course,
      startTime,
      endTime,
      classId,
      dayOfTheWeek,
      building,
      room,
    }) => ({
      title: course.name,
      startDate: new Date(
        2018,
        5,
        mapToDayOfMonth[dayOfTheWeek],
        parseInt(startTime.slice(0, 2)),
        parseInt(startTime.slice(3, 5))
      ),
      endDate: new Date(
        2018,
        5,
        mapToDayOfMonth[dayOfTheWeek],
        parseInt(endTime.slice(0, 2)),
        parseInt(endTime.slice(3, 5))
      ),
      rRule: "FREQ=WEEKLY;COUNT=1000",
      exDate: "20300627T091100Z",
      id: classId,
      building,
      room,
    })
  );

  return (
    <Flex w="90%" m="auto" h="80vh" marginY="3%">
      <Scheduler data={appointments}>
        <ViewState />
        <WeekView startDayHour={7} endDayHour={21} excludedDays={[0, 6]} />
        <Appointments appointmentComponent={Appointment} />
      </Scheduler>
    </Flex>
  );
};

export default LecturersPlan;
