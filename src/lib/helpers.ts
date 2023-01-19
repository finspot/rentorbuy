const rho = (rate: any, duration: any) => {
  return rate / (1 - Math.pow(1 + rate, -duration));
};

const computePayment = ({ duration, rate, principal }: any) => {
  return principal * rho(rate, duration);
};

/*const interests = ({ duration, rate, principal }) => {
  return computePayment({ duration, rate, principal }) * duration - principal;
};*/

const BUY_COST_RATE = 0.01;
const GROWTH_RATE = 0.01;
const INTEREST_RATE = 0.035;
const INSURANCE_RATE = 0.002;
const INVEST_RATE = 0.03;
const RENT_EVOL_RATE = 0.02;
const NOTARY_FEES_RATE = 0.08;

const nplusone = (obj: any) => {
  const payment = obj.buy.payment;
  const interests = (INTEREST_RATE / 12) * obj.buy.principal;
  const buyCosts = (obj.buy.capital * BUY_COST_RATE) / 12;
  const rent = obj.rent.rent * (1 + RENT_EVOL_RATE / 12);
  const sautDeCharge = payment + buyCosts - obj.rent.rent;
  return {
    buy: {
      payment: payment,
      interests: interests,
      insurance: (INSURANCE_RATE / 12) * obj.buy.principal,
      principal: obj.buy.capital - (payment - interests),
      costs: buyCosts,
      totalCosts: obj.buy.totalCosts + interests + buyCosts,
      capital: obj.buy.capital * (1 + GROWTH_RATE / 12) - obj.buy.principal
    },
    rent: {
      capital: obj.rent.capital * (1 + INVEST_RATE / 12),
      cashFlowCapital:
        (obj.rent.cashFlowCapital + sautDeCharge) * (1 + INTEREST_RATE / 12),
      rent: rent,
      totalCosts: obj.rent.totalCosts + rent
    }
  };
};

export const finalArray = (duration: any, goodPrice: any, contribution: any, rent: any): any => {
  const principal = goodPrice * (1 + NOTARY_FEES_RATE) - contribution;
  const payment = computePayment({ duration, INTEREST_RATE, principal });
  const interests = (INTEREST_RATE / 12) * principal;
  const buyCosts = (principal * BUY_COST_RATE) / 12;
  const res = [
    {
      buy: {
        payment: payment,
        interests: interests,
        insurance: (INSURANCE_RATE / 12) * principal,
        principal: principal,
        costs: buyCosts,
        totalCosts: interests + buyCosts,
        capital: goodPrice - principal
      },
      rent: {
        capital: contribution,
        cashFlowCapital: 0,
        rent: rent,
        totalCosts: rent
      }
    }
  ];
  for (let i = 0; i < duration * 12; i++) {
    res.push(nplusone(res[i]));
  }
  return res;
};
