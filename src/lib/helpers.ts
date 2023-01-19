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
const INVEST_RATE = 0.03;
const RENT_EVOL_RATE = 0.02;
const NOTARY_FEES_RATE = 0.08;

const nplusone = (obj: any, interestRate: number, insuranceRate: number, growthRate: number) => {
  const payment = obj.buy.payment;
  const interests = (interestRate) * obj.buy.principal;
  const buyCosts = (obj.buy.goodPrice * BUY_COST_RATE) / 12 + obj.buy.insurance;
  const rent = obj.rent.rent * (1 + RENT_EVOL_RATE / 12);
  const sautDeCharge = Math.max(0, payment + buyCosts - obj.rent.rent);
  return {
    buy: {
      payment: payment,
      interests: interests,
      insurance: insuranceRate * obj.buy.principal,
      principal: obj.buy.principal - (payment - interests),
      costs: buyCosts,
      totalCosts: obj.buy.totalCosts + interests + buyCosts,
      capital: obj.buy.goodPrice - obj.buy.principal,
      goodPrice: obj.buy.goodPrice * (1 + growthRate/12)
    },
    rent: {
      capital: obj.rent.capital * (1 + INVEST_RATE / 12),
      cashFlowCapital:
        (obj.rent.cashFlowCapital + sautDeCharge) * (1 + interestRate),
      rent: rent,
      totalCosts: obj.rent.totalCosts + rent
    }
  };
};

export const finalArray = (duration: any, goodPrice: any, contribution: any, rent: any, interestRate: number, insuranceRate: number, growthRate: number): any => {
  const principal = goodPrice * (1 + NOTARY_FEES_RATE) - contribution;
  const payment = computePayment({ duration: duration*12, rate: interestRate, principal });
  const interests = (interestRate) * principal;
  const buyCosts = (principal * BUY_COST_RATE) / 12;
  const res = [
    {
      buy: {
        payment: payment,
        interests: interests,
        insurance: insuranceRate * principal,
        principal: principal,
        costs: buyCosts,
        totalCosts: interests + buyCosts,
        capital: goodPrice - principal,
        goodPrice: goodPrice
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
    res.push(nplusone(res[i], interestRate, insuranceRate, growthRate));
  }
  return res;
};
