import { arithmeticLessons } from './arithmetic';
import { multiplicationDivisionLessons } from './multiplicationDivision';
import { fractionsLessons } from './fractions';
import { geometryLessons } from './geometry';
import { decimalsPercentagesLessons } from './decimalsPercentages';
import { ratiosProportionsLessons } from './ratiosProportions';
import { algebraLessons } from './algebra';
import { linearEquationsLessons } from './linearEquations';
import { quadraticsLessons } from './quadratics';
import { trigonometryLessons } from './trigonometry';
import { calculusLessons } from './calculus';

export {
  arithmeticLessons,
  multiplicationDivisionLessons,
  fractionsLessons,
  geometryLessons,
  decimalsPercentagesLessons,
  ratiosProportionsLessons,
  algebraLessons,
  linearEquationsLessons,
  quadraticsLessons,
  trigonometryLessons,
  calculusLessons,
};

export const allMathLessons = [
  ...arithmeticLessons,
  ...multiplicationDivisionLessons,
  ...fractionsLessons,
  ...geometryLessons,
  ...decimalsPercentagesLessons,
  ...ratiosProportionsLessons,
  ...algebraLessons,
  ...linearEquationsLessons,
  ...quadraticsLessons,
  ...trigonometryLessons,
  ...calculusLessons,
]; 