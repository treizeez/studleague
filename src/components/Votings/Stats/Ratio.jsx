import { Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const getRatio = ({ voting, users, setState, ref }) => {
  const votedID = voting?.variants
    .map((variant) => variant?.voted.map((i) => i.id))
    .flat(1);
  const allVoted = votedID.length;
  const newArr = ref
    .filter((item) => item.type === "status")
    .map((item) => {
      const filtered = votedID.filter((user) => {
        const exactUser = users.find((u) => u.publicUID === user);
        return exactUser?.status === item.id;
      }).length;

      const percentage = (filtered * 100) / allVoted;

      return {
        filter: item.name,
        percentage: isNaN(percentage) ? 0 : percentage,
        color: item?.color,
      };
    });

  return setState(newArr);
};

export const Ratio = ({ voting, usersInfo }) => {
  const [twoTypes, setTwoTypes] = useState([]);
  const theme = useTheme();
  const ref = useSelector((state) => state.ref);

  useEffect(() => {
    const params = {
      voting,
      setState: setTwoTypes,
      ref,
    };

    getRatio({ ...params, users: usersInfo });
  }, [usersInfo, voting]);

  return (
    <Stack spacing={3}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Співвідношення
      </Typography>
      <Stack spacing={2}>
        {twoTypes.map((type, key) => (
          <Stack spacing={1} key={key}>
            <Typography
              variant="body1"
              sx={{ color: (theme) => theme.palette.grey[500] }}
            >
              {type.filter}
            </Typography>
            <div
              style={{
                width: `${type.percentage}%`,
                height: 20,
                borderRadius: theme.shape.borderRadius,
                backgroundColor: type.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
                fontWeight: "bold",
                transition: "all 0.2s ease-out",
              }}
            >
              {type.percentage > 0 && `${Math.round(type.percentage)}%`}
            </div>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
