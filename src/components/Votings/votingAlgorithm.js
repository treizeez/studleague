import axios from "axios";
import { api } from "../../constants/api";

export const votingAlgorithm = async ({
  voting,
  status,
  setState,
  users,
  type,
  ref,
}) => {
  const allVoters = voting.variants
    .map((variant) => variant?.voted.map((i) => i.id))
    .flat(1);

  const filtered = allVoters.filter((voter) => {
    const user = users.find((u) => u.publicUID === voter);
    return user?.status.includes(status);
  });

  const allWithCost = filtered.map((a) => {
    const userData = users.find((u) => u.publicUID === a);
    const { representative } = userData;

    const k = ref.find((r) => r.id === representative)?.coefficient;

    return k;
  });

  const allWithCostReduced = allWithCost.reduce((a, b) => a + b, 0) || 1;

  const representativeCount = (variant) => {
    return function (representative) {
      return variant.voted.filter((user) => {
        const userData = users.find((u) => u.publicUID === user.id);
        return (
          userData?.representative === representative &&
          userData?.status.includes(status)
        );
      }).length;
    };
  };

  const newArr = voting.variants.map((variant) => {
    const newRepresentativeCount = representativeCount(variant);

    let sum = 0;

    ref
      .filter((r) => r.type === "representative")
      .map(
        (item) =>
          (sum = sum + item?.coefficient * newRepresentativeCount(item.id))
      );

    const percent = (sum * 100) / allWithCostReduced;

    return {
      id: variant.id,
      voted: percent,
    };
  });

  return setState((state) => {
    const copy = Object.assign({}, state);
    copy[type] = newArr;
    return copy;
  });
};
