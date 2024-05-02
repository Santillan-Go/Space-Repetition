export function programNextReview({level,lastReviewDate}) {
    const currentDate = new Date();
    let nextReviewDate;
  
    switch (level) {
      case 'hard':
        nextReviewDate = new Date(currentDate.getTime() + 15 * 60 * 60 * 1000); // 15 horas
        break;
      case 'again':
        nextReviewDate = currentDate; // Revisión inmediata
        break;
      case 'good':
      //const lastReviewDate = new Date(localStorage.getItem('lastReviewDate'));
        if (!lastReviewDate) {
          nextReviewDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000); // 1 día
        } else {
          const daysSinceLastReview = Math.round((currentDate - lastReviewDate) / (24 * 60 * 60 * 1000));
          nextReviewDate = new Date(currentDate.getTime() + (daysSinceLastReview + 1) * 24 * 60 * 60 * 1000); // Sumar 1 día
        }
      //  localStorage.setItem('lastReviewDate', currentDate.toString());
        break;
      default:
        // Manejar caso no reconocido
    }
  
    return nextReviewDate;
  }
  