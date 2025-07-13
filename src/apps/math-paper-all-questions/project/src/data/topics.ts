import { Topic } from '../types';

const topics: Topic[] = [
  {
    id: "arithmetic-properties",
    title: "Arithmetic Properties",
    description: "Learn about types of numbers and basic operations",
    icon: "Calculator",
    color: "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
  },
  {
    id: "number-system",
    title: "The Number System",
    description: "Master positive and negative numbers",
    icon: "PlusMinusIcon",
    color: "bg-orange-50 text-orange-700 hover:bg-orange-100"
  },
  {
    id: "linear-equations",
    title: "Linear Equations",
    description: "Learn to solve equations in the form ax + b = c",
    icon: "Equals",
    color: "bg-blue-50 text-blue-700 hover:bg-blue-100"
  },
  {
    id: "inequalities",
    title: "Inequalities",
    description: "Master solving and graphing expressions with <, >, ≤, ≥",
    icon: "ArrowRightLeft",
    color: "bg-purple-50 text-purple-700 hover:bg-purple-100"
  },
  {
    id: "quadratic-equations",
    title: "Quadratic Equations",
    description: "Solve second-degree equations using factoring and formula",
    icon: "Square",
    color: "bg-green-50 text-green-700 hover:bg-green-100"
  },
  {
    id: "systems-of-equations",
    title: "Systems of Equations",
    description: "Solve multiple equations with multiple variables",
    icon: "GitMerge",
    color: "bg-amber-50 text-amber-700 hover:bg-amber-100"
  },
  {
    id: "exponents",
    title: "Exponents & Radicals",
    description: "Understand powers, roots, and their properties",
    icon: "Superscript",
    color: "bg-red-50 text-red-700 hover:bg-red-100"
  },
  {
    id: "polynomials",
    title: "Polynomials",
    description: "Add, subtract, multiply, and factor polynomials",
    icon: "Brackets",
    color: "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
  }
];

export default topics;