export function initializeDropdownOptions() {
  return {
    levels: [
      { name: 'Beginner' },
      { name: 'Intermediate' },
      { name: 'Advanced' },
    ],
    questionType: [
      { name: 'True/False', value: 'TRUE_FALSE' },
      { name: 'Multiple choice', value: 'MULTIPLE_CHOICE' },
      { name: 'Image based', value: 'IMAGE_BASE' },
    ],
    includeCode: [
      { name: 'No' },
      { name: 'JavaScript' },
      { name: 'Python' },
      { name: 'Java' },
      { name: 'C#' },
    ],
    timeLimit: [
      { name: '5 seconds', value: 5 },
      { name: '10 seconds', value: 10 },
      { name: '15 seconds', value: 15 },
      { name: '20 seconds', value: 20 },
      { name: '30 seconds', value: 30 },
      { name: '1 minute', value: 60 },
      { name: '2 minutes', value: 120 },
      { name: '3 minutes', value: 180 },
      { name: '4 minutes', value: 240 },
    ],
    point: [
      { name: 'Standard' },
      { name: 'Double Point' },
      { name: 'No Point' },
    ],
    answerOptions: [{ name: 'Single Select' }, { name: 'Multi-select' }],
  };
}
