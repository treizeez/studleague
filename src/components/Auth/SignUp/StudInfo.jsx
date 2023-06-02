import { AuthFormLayout } from "../../../layouts/AuthFormLayout";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import { GradientIcons } from "../../../styles/GradientIcons";
import {
  Autocomplete,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const createLevel = (type, length) =>
  Array.from(Array(length).keys()).map((n) => ({
    type,
    value: `${n + 1} курс`,
  }));

export const levels = [
  ...createLevel("Бакалавр", 4),
  ...createLevel("Магістр", 2),
  { type: "", value: "Не студент" },
];

export const StudInfo = ({ data, setData, signUpState, setSignUpState }) => {
  const [allUniv, setAllUniv] = useState([]);
  const [value, setValue] = useState(allUniv[0]?.university_id);
  const [univ, setUniv] = useState();
  const [level, setLevel] = useState(0);
  const [error, setError] = useState();
  const [student, setStudent] = useState(true);

  useEffect(() => {
    fetch("https://registry.edbo.gov.ua/api/universities/?ut=1&exp=json")
      .then((res) => res.json())
      .then((res) => setAllUniv(res));

    return () => setAllUniv([]);
  }, []);

  useEffect(() => {
    if (level === 6) {
      setStudent(false);
    } else {
      setStudent(true);
    }
  }, [level]);

  console.log(data);

  useEffect(() => {
    if (value) {
      fetch(`https://registry.edbo.gov.ua/api/university/?id=${value}&exp=json`)
        .then((res) => res.json())
        .then((res) => setUniv(res));
    } else {
      setUniv();
    }
  }, [value]);

  const range = (start, end) => {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
  };

  const currentYear = new Date().getFullYear();

  const years = range(currentYear - 7, currentYear);

  useEffect(() => {
    setData({
      ...data,
      degree: `${levels[level].value} ${levels[level].type}`,
    });
  }, [level]);

  return (
    <AuthFormLayout
      headerLabel="Делегат"
      error={error}
      header={
        <>
          <GradientIcons
            centered
            icon={<SchoolRoundedIcon />}
            name="studinfo"
            firstColor="#686de0"
            secondColor="#7ed6df"
          />
          <Typography variant="h6">Інформація про делегата</Typography>
        </>
      }
      onBack={() => setSignUpState(signUpState.prev)}
    >
      <TextField
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        select
        label="Освітній ступінь"
      >
        {levels.map((level, key) => (
          <MenuItem key={key} value={key}>
            {level.value} {level.type}
          </MenuItem>
        ))}
      </TextField>
      {student && (
        <>
          <TextField
            value={data?.admissionYear ?? years[years.length - 1]}
            onChange={(e) =>
              setData({ ...data, admissionYear: e.target.value })
            }
            select
            label="Рік вступу"
          >
            {years.map((year, key) => (
              <MenuItem key={key} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>
          <Autocomplete
            freeSolo
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue?.university_id);
            }}
            groupBy={(option) => option?.region_name_u}
            inputValue={data?.university ?? ""}
            onInputChange={(event, newInputValue) => {
              setData({ ...data, university: newInputValue });
            }}
            options={allUniv.sort((a, b) =>
              a?.region_name_u > b.region_name_u ? 1 : -1
            )}
            getOptionLabel={(option) => option.university_name}
            renderInput={(params) => (
              <TextField {...params} label="Університет" />
            )}
          />
          <Autocomplete
            freeSolo
            onInputChange={(event, newInputValue) => {
              setData({ ...data, program: newInputValue });
            }}
            groupBy={(option) => option?.qualification_group_name}
            options={
              univ?.educators.filter(
                (item) =>
                  item.qualification_group_name.toLowerCase() ===
                  levels[level].type.toLowerCase()
              ) ?? []
            }
            inputValue={data?.program ?? ""}
            getOptionLabel={(option) =>
              `${option?.qualification_group_name} ${option?.speciality_code} ${option?.speciality_name}`
            }
            renderInput={(params) => (
              <TextField {...params} label="Освітня програма" />
            )}
          />
        </>
      )}
      <Button
        variant="contained"
        onClick={() => {
          const requiredFields = ["degree"];
          if (
            requiredFields.filter((input) => data[input]).length !==
            requiredFields.length
          ) {
            return setError("Заповніть усі поля");
          }

          return setSignUpState((prev) => ({ now: "status", prev }));
        }}
      >
        Далі
      </Button>
    </AuthFormLayout>
  );
};
