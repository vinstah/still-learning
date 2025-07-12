import { Lesson } from '../types/lesson';

export const physicsLessons: Lesson[] = [
  {
    id: 'newton-laws-intro',
    title: "Newton's Laws of Motion",
    description: "Discover the fundamental laws that govern how objects move in our world",
    topic: "Classical Mechanics",
    difficulty: 'beginner',
    estimatedTime: 15,
    slides: [
      {
        id: 1,
        title: "Meet Sir Isaac Newton",
        content: "Isaac Newton was a brilliant scientist who lived over 300 years ago. He watched the world around him and discovered three simple rules that explain how everything moves - from a rolling ball to planets in space!",
        image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=800",
        story: "Legend says Newton discovered gravity when an apple fell on his head while sitting under a tree. While this might not be exactly true, Newton did spend a lot of time thinking about why things fall down instead of up!",
        concept: "Newton discovered three laws that explain all motion in the universe"
      },
      {
        id: 2,
        title: "The First Law: Objects at Rest",
        content: "Newton's First Law says that objects at rest stay at rest unless something pushes or pulls them. Think about a book on your desk - it will stay there forever unless you pick it up!",
        image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800",
        story: "Imagine you're playing air hockey. When you hit the puck, it glides smoothly across the table because there's very little friction. The puck wants to keep moving in a straight line forever, but eventually the tiny bit of friction and the walls stop it.",
        concept: "Objects at rest stay at rest unless acted upon by a force"
      },
      {
        id: 3,
        title: "The First Law: Objects in Motion",
        content: "The First Law also says that objects in motion stay in motion unless something stops them. A rolling ball would roll forever if there was no friction or walls to stop it!",
        image: "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=800",
        story: "When you're in a car and it suddenly stops, your body keeps moving forward. That's why we wear seatbelts! Your body wants to keep moving at the same speed the car was going.",
        concept: "Objects in motion stay in motion unless acted upon by a force"
      },
      {
        id: 4,
        title: "The Second Law: Force and Acceleration",
        content: "Newton's Second Law tells us that the more force you apply to something, the faster it will accelerate. It's like the difference between gently pushing a swing versus giving it a big push!",
        image: "https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=800",
        story: "Think about pushing a shopping cart. An empty cart is easy to push and speeds up quickly. But a cart full of groceries needs much more force to get it moving at the same speed. The heavier the cart, the more force you need!",
        concept: "Force equals mass times acceleration (F = ma)"
      },
      {
        id: 5,
        title: "The Third Law: Action and Reaction",
        content: "Newton's Third Law states that for every action, there is an equal and opposite reaction. When you push on something, it pushes back on you with the same force!",
        image: "https://images.pexels.com/photos/235985/pexels-photo-235985.jpeg?auto=compress&cs=tinysrgb&w=800",
        story: "When you walk, you push backward on the ground with your feet, and the ground pushes forward on you. That's what moves you forward! Rockets work the same way - they push hot gas downward, and the gas pushes the rocket upward.",
        concept: "For every action, there is an equal and opposite reaction"
      }
    ],
    quiz: {
      questions: [1, 2, 3] // References to question IDs
    }
  },
  {
    id: 'friction-forces',
    title: "Understanding Friction",
    description: "Learn about the force that slows things down and why it's actually helpful",
    topic: "Forces",
    difficulty: 'beginner',
    estimatedTime: 12,
    slides: [
      {
        id: 1,
        title: "What is Friction?",
        content: "Friction is a force that opposes motion when two surfaces rub against each other. It's the reason you can walk without slipping and why your bike eventually stops when you stop pedaling.",
        image: "https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg?auto=compress&cs=tinysrgb&w=800",
        story: "Imagine trying to walk on ice versus walking on concrete. On ice, there's very little friction, so your feet slip. On concrete, there's lots of friction, so you can walk normally. Friction can be helpful or challenging depending on the situation!",
        concept: "Friction is a force that opposes motion between surfaces"
      },
      {
        id: 2,
        title: "Types of Friction",
        content: "There are different types of friction: static friction (keeps things from starting to move), kinetic friction (slows things that are already moving), and rolling friction (affects wheels and balls).",
        image: "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=800",
        story: "When you try to push a heavy box, static friction keeps it in place until you push hard enough. Once it starts moving, kinetic friction takes over and tries to slow it down. Rolling a ball creates much less friction than sliding the same ball across the ground.",
        concept: "Static, kinetic, and rolling friction affect objects differently"
      },
      {
        id: 3,
        title: "Friction in Everyday Life",
        content: "Friction is everywhere! It helps car tires grip the road, lets you write with a pencil, and allows you to hold objects without them slipping from your hands.",
        image: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800",
        story: "Race car drivers understand friction very well. They use special tires with deep grooves to increase friction with the track. In wet conditions, they switch to different tires because water reduces friction and makes cars slip.",
        concept: "Friction is essential for many everyday activities"
      }
    ],
    quiz: {
      questions: [4] // References to question IDs
    }
  }
];

export const getLessonById = (id: string): Lesson | undefined => {
  return physicsLessons.find(lesson => lesson.id === id);
};

export const getAllLessons = (): Lesson[] => {
  return physicsLessons;
};