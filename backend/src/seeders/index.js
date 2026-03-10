const { EducationLevel } = require('../models');

const EDUCATION_LEVELS = [
  { level: 1, description: 'Lower than matric' },
  { level: 2, description: 'High school education (matric)' },
  { level: 3, description: 'Training at college/technical college/on-the-job-training' },
  { level: 4, description: "Training at teachers' college/technikon/university" },
  { level: 5, description: 'Postgraduate degree/university training plus experience' }
];

async function seedDatabase() {
  for (const entry of EDUCATION_LEVELS) {
    await EducationLevel.findOrCreate({
      where: { level: entry.level },
      defaults: entry
    });
  }
}

module.exports = { seedDatabase };
